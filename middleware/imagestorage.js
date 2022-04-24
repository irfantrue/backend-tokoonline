const path = require(`path`);
const multer = require(`multer`);

module.exports = multer.diskStorage({
    destination: `public/images`,
    filename: (req, file, cb) => {
        cb(null,
            file.fieldname + `_` + Date.now() + path.extname(file.originalname)
        );
    },
});