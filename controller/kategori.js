const Kategori = require(`../models/kategori`);
const Validator = require(`fastest-validator`);
const v = new Validator();

module.exports = {

    get_all_kategori: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            if (kategori.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

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

            const kategori = await Kategori.findOne({
                where:{ nama_kategori: nama_kategori }
            });

            if (kategori) return res.json({ msg: `Nama kategori sudah digunakan` });

            await Kategori.create({
                nama_kategori: nama_kategori
            });

            return res.json({ status: 201, msg: `Created` });
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

            if (result != true) return res.json({ status: 400, msg: `Bad Request`, data: result });

            const {id} = req.params;

            const kategori = await Kategori.findByPk(id);

            if (!kategori) return res.json({ status: 404, msg: `Data Not Found` });

            const oldKategori = await Kategori.findOne({
                where:{ nama_kategori: nama_kategori }
            });

            if (oldKategori) return res.json({ msg: `Nama kategori sudah ada` });

            await Kategori.update({ nama_kategori: nama_kategori }, {
                where:{ id:id }
            });

            return res.json({ status: 200, msg: `Berhasil update data`, data:{ id: kategori.id, nama_kategori: nama_kategori } });
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