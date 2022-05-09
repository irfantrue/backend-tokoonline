const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const Kategori = require(`../models/kategori`);
const Keranjang = require('../models/keranjang');
const Transaksi = require('../models/transaksi');
const { Op } = require("sequelize");
const v = new Validator();

module.exports = {

    get_all_produk: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            if (produk.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let result = produk.map((obj) => {
                return {
                    nama_produk: obj.nama_produk,
                    kategori: obj.id_kategori,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug
                }
            })

            return res.json({ status: 200, msg: `OK`, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    detail_produk: async (req, res) => {
        try {
            const { slug } = req.params;

            const produk = await Produk.findOne({ where: { slug: slug } });

            if (!produk) return res.json({ status: 404, msg: `Produk Not Found` });

            const kategori = await Kategori.findByPk(produk.id_kategori, {
                attributes: [`nama_kategori`],
            });

            const listProdukSameCategory = await Produk.findAll({
                limit: 10,
                attributes: [`nama_produk`, `image`, `slug`, `harga`],
                where: { id_kategori: produk.id_kategori, slug: { [Op.ne]: produk.slug } },
                order: [
                    [`createdAt`, `DESC`]
                ],
                raw: true,
            });

            let produkSameCategory = [];

            for (let i = 0; i < listProdukSameCategory.length; i++) {
                listProdukSameCategory[i].nama_kategori = kategori.nama_kategori;

                produkSameCategory.push(listProdukSameCategory[i]);
            };

            let result = {
                produk: {
                    nama_produk: produk.nama_produk,
                    kategori: kategori.nama_kategori,
                    desc: produk.desc,
                    harga: produk.harga,
                    image: produk.image,
                    slug: produk.slug
                },
                produkSameCategory
            }

            return res.json({ status: 200, msg: `OK`, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    add_produk: async (req, res) => {
        try {
            const { 
                nama_produk,
                id_kategori,
                desc,
                harga,
                image,
            } = req.body;

            const schema = {
                nama_produk: `string|empty:false|min:5`,
                id_kategori: `number|empty:false`,
                desc: `string|empty:false|min:8`,
                harga: `number|empty:false`,
                image: `string|empty:false`
            }

            const check = v.compile(schema);

            const result = check({
                nama_produk: nama_produk,
                id_kategori: id_kategori,
                desc: desc,
                harga: harga,
                image: image
            });

            if (result != true) return res.json({ status: 400, msg: result });

            const kategori = await Kategori.findByPk(id_kategori);

            if (!kategori) return res.json({ status: 400, msg: `Bad Request` });

            let slug = String(nama_produk)
                .toLowerCase()
                .replace(/ +/g, `-`)
                .replace(/[^\w-]+/g, ``)
                .replace(/[_]+|[_-]+$/g, ``);

            const cekslug = await Produk.findOne({ where: { slug: slug } });

            if (cekslug) return res.json({ status: 409, msg: `Nama produk telah digunakan` });

            await Produk.create({
                nama_produk: nama_produk,
                id_kategori: id_kategori,
                desc: desc,
                harga: harga,
                image: image,
                slug: slug
            });

            return res.json({ status: 201, msg: `Created` });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    update_produk: async (req, res) => {
        try {
            const { 
                nama_produk,
                id_kategori,
                desc,
                harga,
                image,
            } = req.body;

            const schema = {
                nama_produk: `string|empty:false|min:5`,
                id_kategori: `number|empty:false`,
                desc: `string|empty:false|min:8`,
                harga: `number|empty:false`,
                image: `string|empty:false`
            }

            const check = v.compile(schema);

            const result = check({
                nama_produk: nama_produk,
                id_kategori: id_kategori,
                desc: desc,
                harga: harga,
                image: image
            });

            if (result != true) return res.json({ status: 400, msg: result });

            const kategori = await Kategori.findByPk(id_kategori);

            if (!kategori) return res.json({ status: 400, msg: `Bad Request` });

            const { slug } = req.params;

            const produk = await Produk.findOne({ where: { slug: slug } });

            if (!produk) return res.json({ status: 404, msg: `Data Not Found` });

            let newSlug = String(nama_produk)
                .toLowerCase()
                .replace(/ +/g, `-`)
                .replace(/[^\w-]+/g, ``)
                .replace(/[_]+|[_-]+$/g, ``);
            
            if (produk.slug != newSlug) {
                // CHANGE SLUG (Jika merubah nama produk)
                const oldProduk = await Produk.findOne({ where: { slug: newSlug } });

                if (oldProduk) return res.json({ msg: `Nama produk telah digunakan` });
            }

            await Produk.update(
            {
                nama_produk: nama_produk,
                id_kategori: id_kategori,
                desc: desc,
                harga: harga,
                image: image,
                slug: newSlug
            }, { where: { slug: slug } }
            );

            return res.json({ status: 200, msg: `Berhasil update data` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    delete_produk: async (req, res) => {
        try {
            const { slug } = req.params;

            const produk = await Produk.findOne({
                where: { slug: slug },
            });

            if (!produk) return res.json({ status: 404, msg: `Data Not Found` });

            // delete all in cart
            await Keranjang.destroy({
                where: { id_produk: produk.id}
            });

            // delete all in transaksi
            await Transaksi.destroy({
                where: { id_produk: produk.id}
            });

            await Produk.destroy({
                where: { slug: slug },
            });

            return res.json({ status: 200, msg: `Berhasil delete produk` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}