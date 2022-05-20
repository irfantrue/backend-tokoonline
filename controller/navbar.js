const jwt_decode = require(`jwt-decode`);

module.exports = {

    identitas_navbar: async (req, res) => {
        try {
            let fullname = ``;
            let role = ``

            const authHeader = req.headers[`authorization`];

            if (authHeader) {
                const token = authHeader && authHeader.split(` `)[1];
                if (token) {
                    let decode = jwt_decode(token);
                    fullname = decode.fullname   
                    role = decode.level
                }
            };

            let result = {
                fullname,
                role
            };

            return res.json({ status: 200, msg: `OK`, data: result });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}