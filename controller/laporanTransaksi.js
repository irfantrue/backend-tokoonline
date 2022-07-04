const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Transaksi = require('../models/transaksi');
const Pembayaran = require(`../models/pembayaran`);
const { Op } = require("sequelize");
const fs = require(`fs`)
const XLSX = require("xlsx");
const path = require(`path`);


function deleteFile (file) {

    fs.unlink(file, () => {

        console.log(`${file} DELETED!`)

    })
}

module.exports = {
    
    getLaporanTransaksi: async (req, res) => {
        try {
            let {
                startDate,
                endDate
            } = req.body;

            const schema = {
                startDate: `string|empty:false|min:10`,
                endDate: `string|empty:false|min:10`,
            }

            const check = v.compile(schema);

            const result = check({
                startDate: startDate,
                endDate: endDate
            });

            if (result != true) return res.json({ status: 400, msg: `Tanggal tidak boleh kosong` });

            let transaksi = await Transaksi.findAll({
                where:{
                    [Op.or]: [{
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    }, {
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    }]
                },
                raw: true
            });

            if (!transaksi.length) return res.json({ status: 404, msg: `Data Kosong` });
            
            for (let i = 0; i < transaksi.length; i++) {
                arrUser = await Users.findByPk(transaksi[i].id_user, { raw: true });
    
                arrProduk = await Produk.findByPk(transaksi[i].id_produk, { raw: true });

                transaksi[i].pelanggan = arrUser.fullname;

                transaksi[i].nama_produk = arrProduk.nama_produk;
            };

            transaksi = transaksi.map((obj, i) => {
                return {
                    Produk: obj.nama_produk,
                    kodeOrder: obj.kode_odr,
                    Pembayaran: obj.pembayaran,
                    Terjual: obj.jumlah,
                    Total: obj.total_harga,
                    Status: obj.status,
                    Tanggal: obj.createdAt.toLocaleDateString()
                }
            });

            return res.json({ status: 200, data: transaksi})
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },
}