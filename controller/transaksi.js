const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Transaksi = require('../models/transaksi');
const Pembayaran = require(`../models/pembayaran`);

module.exports = {

    get_produk_transaksi: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const transaksi = await Transaksi.findAll({ where: { id_user: user.id } });

            if (transaksi.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let produk = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    image: obj.image,
                    alamat_tujuan: obj.alamat_tujuan,
                    pembayaran: obj.pembayaran,
                    jumlah: obj.jumlah,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Produk.findByPk(transaksi[i].id_produk);
                
                // Menambahkan data nama produk
                produk[i].nama_produk = a.nama_produk;
            };

            return res.json({ status: 200, msg: `OK`, data: produk })
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

            if (transaksi.status == `selesai` || transaksi.status == `pengiriman`) return res.json({ msg: `Transaksi tidak bisa dibatalkan` });

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

                deskripsi = deskripsi.toString();

                await data_pembayaran.update({
                    desc: deskripsi,
                    total_harga: data_pembayaran.total_harga - transaksi.total_harga
                });
            };

            let x = await Pembayaran.findByPk(transaksi.id_pembayaran);
            
            if (x.total_harga == 0) await x.destroy();

            return res.json({ status: 200, msg: `Berhasil batal order` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    // UNTUK ADMIN DASHBOARD
    get_all_transaksi_user: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            if (transaksi.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let produk = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    image: obj.image,
                    alamat_user: obj.alamat_user,
                    alamat_tujuan: obj.alamat_tujuan,
                    pembayaran: obj.pembayaran,
                    jumlah: obj.jumlah,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                produk[i].email = a.email;
            }

            return res.json({ status: 200, msg: `OK`, data: produk });
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