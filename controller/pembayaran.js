const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Pembayaran = require(`../models/pembayaran`);
const { Op } = require("sequelize");
const Transaksi = require("../models/transaksi");

module.exports = {

    get_pembayaran_user: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            const pembayaran = await Pembayaran.findAll({ 
                where: { id_user: user.id },
                order: [[`createdAt`, `DESC`]]
            });

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let result = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    status: obj.status,
                    total_harga: obj.total_harga,
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

    sortingAllPembayaranByDate: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            let {
                startDate,
                endDate,
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

            const pembayaran = await Pembayaran.findAll({ 
                where: { 
                    id_user: user.id,
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
                order: [[`createdAt`, `DESC`]],
            });

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    status: obj.status,
                    total_harga: obj.total_harga,
                }
            });

            return res.json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    get_pembayaran_all: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let result = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                result[i].email = a.email

                result[i].phone = a.phone;

                result[i].fullname = a.fullname;
            };

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    detail_pembayaran: async (req, res) => {
        try {
            const { id } = req.params;

            const pembayaran = await Pembayaran.findByPk(id);

            if (!pembayaran) return res.json({ status: 404, msg: `Data Not Found` });

            const user = await Users.findByPk(pembayaran.id_user);

            let result = {
                kode_pby: pembayaran.kode_pby,
                image: pembayaran.image,
                fullname: user.fullname,
                status: pembayaran.status,
                no_rek: `16601940xx`,
                total_harga: pembayaran.total_harga,
            };

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    update_status_pembayaran: async (req, res) => {
        try {
            const {
                status
            } = req.body;

            const schema = {
                status: `string|empty:false`,
            }

            const check = v.compile(schema);

            const result = check({
                status: status
            });

            if (result != true) return res.json({ status: 400, msg: `Bad Request` });

            const { id } = req.params;

            const pembayaran = await Pembayaran.findByPk(id);

            if (!pembayaran) return res.json({ status: 404, msg: `Data Not Found` });

            await Pembayaran.update(
                {
                    status: status
                }, { where: { id: id } }
            );

            return res.json({ status: 200, msg: `Berhasil update data` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },
    
    deletePembayaranUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const pembayaran = await Pembayaran.findByPk(id);

            if (!pembayaran) return res.json({ status: 404, msg: `Data Not Found` });

            await Transaksi.destroy({
                where: { id_pembayaran: id }
            });

            await Pembayaran.destroy({
                where: { id: id }
            });

            return res.json({ status: 200, msg: `Berhasil delete pembayaran` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}
