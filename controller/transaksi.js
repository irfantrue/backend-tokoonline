const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const Keranjang = require('../models/keranjang');
const v = new Validator();
const db = require('../database');
const { QueryTypes } = require('sequelize');
const jwt_decode = require(`jwt-decode`);
const Transaksi = require('../models/transaksi');

module.exports = {

    getalltransaksi: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const transaksi = await Transaksi.findAll({ where: { id_user: user.id } });

            if (transaksi.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let produk = transaksi.map((obj) => {
                return {
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

    // UNTUK ADMIN
    getTransaksi: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            if (transaksi.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            return res.json({ status: 200, msg: `OK`, data: transaksi });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    updatStatusProduk: async (req, res) => {
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