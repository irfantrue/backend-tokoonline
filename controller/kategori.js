const Kategori = require(`../models/kategori`);
const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const v = new Validator();
const generateKodeUnik = require(`./function/generateKodeUnik`);

module.exports = {

    search_product_by_kategori: async (req, res) => {
        try {
            const { slug } = req.params;

            const kategori = await Kategori.findOne({ where:{ slug: slug } });

            if (!kategori) return res.json({ status: 404, msg: `Data Not Found` });

            const produk = await Produk.findAll({ where:{ id_kategori: kategori.id } })

            if (!produk) return res.json({ status: 404, msg: `Data Not Found` });

            return res.json({ status: 200, msg: produk });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    get_all_kategori: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            return res.json({ status: 200, msg: `OK`, data: kategori });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    add_kategori: async (req, res) => {
        try {
            const { nama_kategori } = req.body;

            const schema = {
                nama_kategori: "string|empty:false|min:3|max:20"
            };

            const check = v.compile(schema);

            const result = check({
                nama_kategori: nama_kategori
            });

            if (result != true) return res.json({ status: 400, msg: result });

            let slug = String(nama_kategori)
                .toLowerCase()
                .replace(/ +/g, `-`)
                .replace(/[^\w-]+/g, ``)
                .replace(/[_]+|[_-]+$/g, ``);

            const cekslug = await Kategori.findOne({ where: { slug: slug } });

            if (cekslug) return res.json({ status: 409, msg: `Nama kategori telah digunakan` });

            let lastData = await Kategori.findAll({
                limit: 1,
                order: [ [ `kode_ktr`, `DESC` ] ],
                raw: true
            })

            await Kategori.create({
                kode_ktr: generateKodeUnik(lastData,2),
                nama_kategori: nama_kategori,
                slug: slug
            });

            return res.json({ status: 201, msg: `Berhasil tambah data` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    update_kategori: async (req, res) => {
        try {
            const { nama_kategori } = req.body;

            const schema = {
                nama_kategori: "string|empty:false|min:3|max:20"
            };

            const check = v.compile(schema);
            
            const result = check({
                nama_kategori:nama_kategori
            });

            if (result != true) return res.json({ status: 400, msg: result });

            const {id} = req.params;

            const kategori = await Kategori.findByPk(id);

            if (!kategori) return res.json({ status: 404, msg: `Data Not Found` });

            let newSlug = String(nama_kategori)
                .toLowerCase()
                .replace(/ +/g, `-`)
                .replace(/[^\w-]+/g, ``)
                .replace(/[_]+|[_-]+$/g, ``);
            
            if (kategori.slug != newSlug) {
                // CHANGE SLUG (Jika merubah nama produk)
                const oldKategori = await Kategori.findOne({ where: { slug: newSlug } });

                if (oldKategori) return res.json({ status: 409, msg: `Nama kategori telah digunakan` });
            }

            await Kategori.update({ 
                nama_kategori: nama_kategori,
                slug: newSlug
            }, {
                where:{ id:id }
            });

            return res.json({ status: 200, msg: `Berhasil update data` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    delete_kategori: async (req, res) => {
        try {
            const {id} = req.params;

            const kategori = await Kategori.findByPk(id);

            if (!kategori) return res.json({ status: 404, msg: `Kategori tidak ditemukan` });

            const produk = await Produk.findAll({
                where: { id_kategori: id }
            });

            if (produk) {
                for (let i = 0; i < produk.length; i++) {
                    await produk[i].update({
                        id_kategori: null
                    });
                };
            };

            await Kategori.destroy({
                where: { id: id }
            });

            return res.json({ status: 200, msg: `Berhasil delete data`, data: kategori });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}