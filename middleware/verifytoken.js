const jwt = require(`jsonwebtoken`);

module.exports = async (req, res, next) => {
    const authHeader = req.headers[`authorization`];
    const token = authHeader && authHeader.split(` `)[1];
        
    if (token == null) return res.json({status:401, msg:"Unauthorized"});

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.json({status:401, msg:"Unauthorized"});
        req.email = decoded.email;
        next();
    });
};