const Users = require(`../models/userdb`);
const Crypto = require(`crypto-js`);
const jwt = require(`jsonwebtoken`);
const Validator = require(`fastest-validator`);
const v = new Validator();

module.exports = {

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const schema = {
                email: "string|empty:false",
                password: "string|empty:false"
            }

            const check = v.compile(schema);

            const result = check({
                email: email,
                password: password
            });

            if (result != true) return res.json({ status: 400, msg: result });

            const users = await Users.findOne({ where:{ email: email } })

            if (!users) return res.json({ status: 404, msg: `Akun tidak ditemukan` });

            const original = Crypto.AES.decrypt(users.password, process.env.KEY_CRYPTO).toString(Crypto.enc.Utf8);

            if (original != password) return res.json({ status: 401, msg: `Username / password salah`});

            let payload = { 
                fullname: users.fullname, 
                email: users.email,
                address: users.address,
                level: users.level
            };

            const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn:`3d` });

            return res.json({ status: 200, msg: `OK`, data:{ accessToken } });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    signup: async (req, res) => {
        try {
            const {
                fullname,
                email,
                password,
                address,
                // level
            } = req.body;
            
            let level = `User`;

            const schema = {
                fullname: "string|empty:false|min:3|max:30",
                email: "email|empty:false",
                password: "string|empty:false|min:6|max:30",
                address: "string|empty:false|min:8",
                level: "string|empty:false|min:3"
            };

            const check = v.compile(schema);
            
            const result = check({
                fullname:fullname,
                email:email,
                password:password,
                address:address,
                level:level
            });

            if (result != true) return res.json({ status: 400, msg: result });

            const olduser = await Users.findOne({ where: { email: email } });

            if (olduser) return res.json({ status: 409, msg: `Username / Email sudah digunakan` });

            let cipher = Crypto.AES.encrypt(password, process.env.KEY_CRYPTO).toString();

            await Users.create({
                fullname: fullname,
                email: email,
                password: cipher,
                address: address,
                level: level
            });

            return res.json({ status: 201, msg: `Created` });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}