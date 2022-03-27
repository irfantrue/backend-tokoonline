const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const v = new Validator();
const db = require('../database');
const { QueryTypes } = require('sequelize');
const jwt_decode = require(`jwt-decode`);
const Keranjang = require('../models/keranjang');

module.exports = {

    home: async (req, res) => {
        try {
            const new_produk = await db.query(
                "SELECT a.createdAt, a.nama_produk, a.harga, a.slug, a.image, b.nama_kategori FROM tokoonline.produk AS a INNER JOIN tokoonline.kategori AS b ON a.id_kategori = b.id ORDER BY a.createdAt DESC", 
                { type: QueryTypes.SELECT });

            let result = {
                new_produk
            };

            return res.json({ status: 200, msg: `OK`, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    addCart: async (req, res) => {
        try {
            const { slug } = req.params;

            const produk = await Produk.findOne({ where: { slug: slug } });

            if (!produk) return res.json({ status: 404, msg: `Produk Not Found` });

            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const schema = {
                id_produk: `number|empty:false`,
                id_user: `number|empty:false`,
                jumlah: `number|empty:false`
            };

            const check = v.compile(schema);

            const result = check({
                id_produk: produk.id,
                id_user: decode.id,
                jumlah: 1
            });

            if (result != true) return res.json({ status: 400, msg: result });

            await Keranjang.create({
                id_produk: produk.id,
                id_user: decode.id,
                jumlah: 1
            });

            return res.json({ status: 201, msg: `Berhasil menambahkan` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    cancelCart: async (req, res) => {
        try {
            const { slug } = req.params;

            const produk = await Produk.findOne({ where: { slug: slug } });

            if (!produk) return res.json({ status: 404, msg: `Produk Not Found` });

            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const keranjang = await Keranjang.findOne({ where: { id_produk: id_produk, id_user: decode.id } });

            if (!keranjang) return res.json({ status: 404, msg: `Produk keranjang Not Found` });

            await keranjang.destroy();

            return res.json({ status: 200, msg: `Berhasil delete` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}