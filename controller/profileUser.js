const Users = require(`../models/userdb`);
const jwt_decode = require(`jwt-decode`);
const Validator = require(`fastest-validator`);
const v = new Validator();

module.exports = {

    getDataUser: async (req, res) => {
        try {
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            let result = {
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                address: user.address
            }

            res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    editDataUser: async (req, res) => {
        try {
            const {
                fullname,
                email,
                phone,
                address
            } = req.body;

            const schema = {
                fullname: "string|empty:false|min:3|max:30",
                email: "email|empty:false",
                phone: "string|empty:false|min:9",
                address: "string|empty:false|min:8",
            };

            const check = v.compile(schema);
            
            const result = check({
                fullname:fullname,
                email:email,
                phone:phone,
                address:address,
            });

            if (result != true) return res.json({ status: 400, msg: result });
            
            const authHeader = req.headers[`authorization`];

            const token = authHeader && authHeader.split(` `)[1];

            let decode = jwt_decode(token);

            const user = await Users.findOne({ where: { email: decode.email } });

            if (!user) return res.json({ status: 404, msg: `Data Not Found` });

            if (user.email != email) {
                const olduser = await Users.findOne({ where: { email: email } });
    
                if (olduser) return res.json({ status: 409, msg: `Username / Email sudah digunakan` });
            }

            await user.update({
                fullname: fullname,
                email: email,
                phone: phone,
                address: address
            });

            return res.json({ status: 200, msg: `Berhasil update data`});
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}