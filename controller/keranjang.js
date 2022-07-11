const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const Keranjang = require('../models/keranjang');
const Pembayaran = require(`../models/pembayaran`);
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Transaksi = require('../models/transaksi');
const Produk = require(`../models/produk`);
const generateKodeUnik = require(`./function/generateKodeUnik`);


module.exports = {

    get_all_cart: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const keranjang = await Keranjang.findAll({ where:{ id_user: user.id } });

            if (keranjang.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let produk = keranjang.map((obj) => {
                return {
                    id: obj.id,
                    id_produk: obj.id_produk,
                    // image: obj.image,
                    jumlah: obj.jumlah,
                    harga: obj.harga,
                    total_harga: obj.harga * obj.jumlah
                }
            });

            for (let i = 0; i < produk.length; i++) {
                let a = await Produk.findByPk(produk[i].id_produk);

                // Menambahkan data image
                produk[i].image = a.image;

                // Menambahkan data nama slug
                produk[i].slug = a.slug;
                
                // Menambahkan data nama produk
                produk[i].nama_produk = a.nama_produk;
            };

            let array_total_harga = [];

            for (let i = 0; i < keranjang.length; i++) {
                let a = keranjang[i].jumlah * keranjang[i].harga;

                array_total_harga.push(a);
            };

            let total = 0;

            for (let i = 0; i < array_total_harga.length; i++) {
                total = total + array_total_harga[i];
            };

            let result = {
                produk,
                total
            }

            return res.json({ status: 200, msg: `OK`, data: result })
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    tambah_jumlah_produk: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            let jumlah = 1;

            const tambah = await Keranjang.findOne({ where: { id: id } });

            if (!tambah) return res.json({ status: 404, msg: `Data Not Found` });

            await tambah.update({
                jumlah: tambah.jumlah + jumlah,
            });

            return res.json({ status: 200, msg: `Berhasil update data` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    kurang_jumlah_produk: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            let jumlah = 1;

            const kurang = await Keranjang.findOne({ where: { id: id } });

            if (!kurang) return res.json({ status: 404, msg: `Data Not Found` });

            if (kurang.jumlah == 1) return res.json({ msg: `Jumlah produk tidak boleh 0` });

            await kurang.update({
                jumlah: kurang.jumlah - jumlah,
            });

            return res.json({ status: 200, msg: `Berhasil update data` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    checkout: async (req, res) => {
        try {
            const {
                alamat_tujuan,
                pembayaran,
                tanggalJadiPesanan
            } = req.body;

            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            console.log(tanggalJadiPesanan);

            const user = await Users.findOne({ where: { email: decode.email } });

            const data_keranjang = await Keranjang.findAll({ where: { id_user: user.id} });

            const schema = {
                id_user: `number|empty:false`,
                alamat_tujuan: `string|empty:false`,
                tanggalJadiPesanan: `string|empty:false`,
                pembayaran: `string|empty:false`,
                produk: {
                    type: `array`,
                    min: 1,
                    items: {
                        type: `object`,
                    }
                }
            };

            const check = v.compile(schema);
            
            const result = check({
                id_user: user.id,
                tanggalJadiPesanan: tanggalJadiPesanan,
                alamat_tujuan: alamat_tujuan,
                pembayaran: pembayaran,
                produk: data_keranjang
            });

            if (result != true) return res.json({ status: 400, msg: result });

            let array_total_harga = [];

            for (let i = 0; i < data_keranjang.length; i++) {
                let a = data_keranjang[i].jumlah * data_keranjang[i].harga;

                array_total_harga.push(a);
            };

            let total = 0;

            for (let i = 0; i < array_total_harga.length; i++) {
                total = total + array_total_harga[i];
            };

            if (total == 0) return res.json({ status: 404, msg: `Tidak ada produk yang dibeli` });

            let pembayaran_user = 0;

            let deskripsi = [];

            for (let i = 0; i < data_keranjang.length; i++) {
                let a = await Produk.findByPk(data_keranjang[i].id_produk);

                let b = `${a.nama_produk} x ${data_keranjang[i].jumlah}`;

                deskripsi.push(b);
            };

            deskripsi = deskripsi.toString().replace(/,+/g, `, `);

            if (pembayaran == `BCA Transfer`) {
                let lastData = await Pembayaran.findAll({
                    limit: 1,
                    order: [ [ `kode_pby`, `DESC` ] ],
                    raw: true
                });

                pembayaran_user = await Pembayaran.create({
                    kode_pby: generateKodeUnik(lastData,4),
                    id_user: user.id,
                    image: null,
                    desc: deskripsi,
                    ongkir: 0,
                    total_harga: total,
                    status: `Belum Lunas`
                });
            };

            for (let i = 0; i < data_keranjang.length; i++) {
                let lastData = await Transaksi.findAll({
                    limit: 1,
                    order: [ [ `kode_odr`, `DESC` ] ],
                    raw: true
                });

                await Transaksi.create({
                    kode_odr: generateKodeUnik(lastData,3),
                    id_produk: data_keranjang[i].id_produk,
                    id_user: data_keranjang[i].id_user,
                    id_pembayaran: pembayaran_user.id,
                    alamat_tujuan: alamat_tujuan,
                    tgl_pengiriman: tanggalJadiPesanan,
                    pembayaran: pembayaran,
                    jumlah: data_keranjang[i].jumlah,
                    total_harga: data_keranjang[i].jumlah * data_keranjang[i].harga,
                    status: "Menunggu Konfirmasi",
                });
            };

            await Keranjang.destroy({
                where: { id_user: user.id }
            });

            console.log(tanggalJadiPesanan)

            return res.json({ status: 201, msg: `Berhasil melakukan pembelian` });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}