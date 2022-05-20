const jwt = require(`jsonwebtoken`);
const jwt_decode = require(`jwt-decode`);

module.exports = async (req, res, next) => {
    const authHeader = req.headers[`authorization`];
    const token = authHeader && authHeader.split(` `)[1];

    if (token == null) return res.json({status:401, msg:"Unauthorized"});

    let decode = jwt_decode(token);

    if (decode.level != `Developer`) return res.json({status:401, msg:"Admin Only"});

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.json({status:401, msg:"Unauthorized"});
        req.email = decoded.email;
        next();
    });
};