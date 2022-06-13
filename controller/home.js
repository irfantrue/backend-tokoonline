const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const Keranjang = require('../models/keranjang');
const v = new Validator();
const db = require('../database');
const { QueryTypes } = require('sequelize');
const jwt_decode = require(`jwt-decode`);
const Kategori = require('../models/kategori');

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

    add_cart: async (req, res) => {
        try {
            const { slug } = req.params;

            const produk = await Produk.findOne({ where: { slug: slug } });

            if (!produk) return res.json({ status: 404, msg: `Produk Not Found` });

            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const schema = {
                id_produk: `number|empty:false`,
                id_user: `number|empty:false`,
                jumlah: `number|empty:false`,
                harga: `number|empty:false`,
                image: `string|empty:false`
            };

            const check = v.compile(schema);
            
            const result = check({
                id_produk: produk.id,
                id_user: user.id,
                jumlah: 1,
                harga: produk.harga,
                image: produk.image
            });

            if (result != true) return res.json({ status: 400, msg: result });

            const duplikat_produk = await Keranjang.findOne({ where: { id_user: user.id, id_produk: produk.id } });

            if (duplikat_produk) return res.json({ status: 409, msg: `Produk sama sudah ada di keranjang` });

            await Keranjang.create({
                id_produk: produk.id,
                id_user: user.id,
                jumlah: 1,
                harga: produk.harga,
                image: produk.image
            });

            return res.json({ status: 201, msg: `Berhasil menambahkan` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    cancel_cart: async (req, res) => {
        try {
            const { slug } = req.params;

            const produk = await Produk.findOne({ where: { slug: slug } });

            if (!produk) return res.json({ status: 404, msg: `Produk Not Found` });

            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const keranjang = await Keranjang.findOne({ where: { id_produk: produk.id, id_user: user.id } });

            if (!keranjang) return res.json({ status: 404, msg: `Produk keranjang Not Found` });

            await keranjang.destroy();

            return res.json({ status: 200, msg: `Berhasil delete` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}