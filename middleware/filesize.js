module.exports = (err, req, res, next) => {
    if (err) {
        return res.json({ status: 400, msg: err.message });
    } else {
        next();
    }
}