const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Pembayaran = require(`../models/pembayaran`);

module.exports = {

    get_pembayaran_user: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const pembayaran = await Pembayaran.findAll({ where: { id_user: user.id } });

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let result = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    no_rek: 1660194083
                }
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    update_pembayaran_user: async (req, res) => {
        try {
            const {
                image
            } = req.body;

            const schema = {
                image: `string|empty:false`
            };

            const check = v.compile(schema);

            const result = check({
                image: image
            });

            if (result != true) return res.json({ status: 400, msg: result });

            const {id} = req.params;

            const pembayaran = await Pembayaran.findByPk(id);

            if (!pembayaran) return res.json({ status: 404, msg: `Data Not Found` });

            await pembayaran.update({
                image: image
            });

            return res.json({ status: 200, msg: `Berhasil update` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    get_pembeyaran_all: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let result = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                result[i].email = a.email;
            };

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}
