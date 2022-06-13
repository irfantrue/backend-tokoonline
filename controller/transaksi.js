const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Transaksi = require('../models/transaksi');
const Pembayaran = require(`../models/pembayaran`);

module.exports = {

    detailTransaksiUser: async (req, res) => {
        try {
            const { id } = req.params;

            const transaksi = await Transaksi.findByPk(id);

            if (!transaksi) return res.json({ status: 404, msg: `Transaksi item tidak ditemukan` });

            const user = await Users.findByPk(transaksi.id_user);

            const produk = await Produk.findByPk(transaksi.id_produk);

            let result = {
                kode_odr: transaksi.kode_odr,
                nama_user: user.fullname,
                phone: user.phone,
                alamat_1: user.address,
                alamat_2: transaksi.alamat_tujuan,
                nama_produk: produk.nama_produk,
                image: produk.image,
                tgl_pengiriman: `${transaksi.tgl_pengiriman.toLocaleDateString()} ${transaksi.tgl_pengiriman.toLocaleTimeString()}`,
                pembayaran: transaksi.pembayaran,
                jumlah: transaksi.jumlah,
                harga_produk: produk.harga,
                total_harga: transaksi.total_harga,
                status: transaksi.status,
                tgl_pembelian: transaksi.createdAt.toLocaleDateString()
            };

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    get_produk_transaksi: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const transaksi = await Transaksi.findAll({ 
                where: { id_user: user.id },
                order: [[`createdAt`, `DESC`]]
            });

            if (transaksi.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let produk = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_produk: obj.id_produk,
                    alamat_tujuan: obj.alamat_tujuan,
                    pembayaran: obj.pembayaran,
                    jumlah: obj.jumlah,
                    total_harga: obj.total_harga,
                    tgl_pengiriman: `${obj.tgl_pengiriman.toLocaleDateString()} ${obj.tgl_pengiriman.toLocaleTimeString()}`,
                    status: obj.status,
                    tgl_pembelian: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan harga satuan produk
                produk[i].harga = a.harga;

                // Menambahkan data image produk
                produk[i].image = a.image
                
                // Menambahkan data nama produk
                produk[i].nama_produk = a.nama_produk;
            };

            return res.json({ status: 200, msg: `OK`, data: produk })
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    delete_transaksi: async (req, res) => {
        try {
            const { id } = req.params;

            const transaksi = await Transaksi.findByPk(id);

            if (!transaksi) return res.json({ status: 404, msg: `Transaksi item tidak ditemukan` });

            await transaksi.destroy();

            return res.json({ status: 200, msg: `Berhasil hapus order` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    batal_transaksi: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const {id} = req.params;

            const transaksi = await Transaksi.findByPk(id);

            if (!transaksi) return res.json({ status: 404, msg: `Transaksi item tidak ditemukan` });

            if (transaksi.status != `Menunggu Konfirmasi`) return res.json({ status: 400, msg: `Transaksi tidak bisa dibatalkan` });
            
            await transaksi.destroy();

            if (transaksi.pembayaran == `BCA Transfer`) {
                let data_pembayaran = await Pembayaran.findByPk(transaksi.id_pembayaran);
                
                let data_transaksi = await Transaksi.findAll({ where:{ id_user: user.id, id_pembayaran: transaksi.id_pembayaran } });
                
                let deskripsi = [];
                
                for (let i = 0; i < data_transaksi.length; i++) {
                    let a = await Produk.findByPk(data_transaksi[i].id_produk);
                    
                    let b = `${a.nama_produk} x ${data_transaksi[i].jumlah}`;
                    
                    deskripsi.push(b);
                };
                
                deskripsi = deskripsi.toString().replace(/,+/g, `, `);
                
                await data_pembayaran.update({
                    desc: deskripsi,
                    total_harga: data_pembayaran.total_harga - transaksi.total_harga
                });
            };

            let x = await Pembayaran.findByPk(transaksi.id_pembayaran);
            
            if (x != null) {
                if (x.total_harga == 0) await x.destroy();
            }

            return res.json({ status: 200, msg: `Berhasil batal order` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    // UNTUK ADMIN DASHBOARD
    get_all_transaksi_user: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            // if (transaksi.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let result = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    kode_odr: obj.kode_odr,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);
                let b = await Produk.findByPk(transaksi[i].id_produk);
                
                // Menambahkan data image produk
                result[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                result[i].phone = a.phone;
                
                // Menambahkan data alamat original user
                result[i].alamat_user = a.address;

                // Menambahkan data email user
                result[i].fullname = a.fullname;
            };

            return res.json({ status: 200, msg: `OK`, data: result});
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    update_status_transaksi: async (req, res) => {
        try {
            const {
                status
            } = req.body;

            const schema = {
                status: `string|empty:false|min:5`,
            }

            const check = v.compile(schema);

            const result = check({
                status: status
            });

            if (result != true) return res.json({ status: 400, msg: `Bad Request` });
            
            const {
                id
            } = req.params;
            
            const transaksi = await Transaksi.findByPk(id);

            if (!transaksi) return res.json({ status: 404, msg: `Data Not Found` });

            await transaksi.update({ status: status });

            return res.json({ status: 200, msg: `Berhasil update data` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}