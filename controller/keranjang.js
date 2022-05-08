const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const Keranjang = require('../models/keranjang');
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Transaksi = require('../models/transaksi');
const Produk = require(`../models/produk`);

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
                    image: obj.image,
                    jumlah: obj.jumlah,
                    harga: obj.harga
                }
            });

            let list_produk = [];

            for (let i = 0; i < keranjang.length; i++) {
                let a = await Produk.findByPk(keranjang[i].id_produk);
                
                // Menambahkan data nama produk
                produk[i].nama_produk = a.nama_produk;

                list_produk.push(a);
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
                list_produk,
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

            const tambah = await Keranjang.findByPk(id);

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

            const kurang = await Keranjang.findByPk(id);

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
                pembayaran
            } = req.body;

            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const data_keranjang = await Keranjang.findAll({ where: { id_user: user.id} });

            const schema = {
                id_user: `number|empty:false`,
                alamat_user: `string|empty:false`,
                alamat_tujuan: `string|empty:false`,
                pembayaran: `string|empty:false`,
            };

            const check = v.compile(schema);
            
            const result = check({
                id_user: user.id,
                alamat_user: user.address,
                alamat_tujuan: alamat_tujuan,
                pembayaran: pembayaran,
            });

            if (result != true) return res.json({ status: 400, msg: result });

            for (let i = 0; i < data_keranjang.length; i++) {
                await Transaksi.create({
                    id_produk: data_keranjang[i].id_produk,
                    id_user: data_keranjang[i].id_user,
                    image: data_keranjang[i].image,
                    alamat_user: user.address,
                    alamat_tujuan: alamat_tujuan,
                    pembayaran: pembayaran,
                    jumlah: data_keranjang[i].jumlah,
                    harga: data_keranjang[i].harga,
                    total_harga: data_keranjang[i].jumlah * data_keranjang[i].harga,
                    status: "proses",
                });
            };

            await Keranjang.destroy({
                where: { id_user: user.id }
            });

            return res.json({ status: 201, msg: `Berhasil melakukan pembelian` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}