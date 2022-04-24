const multer = require(`multer`);
const imagestorage = require(`./imagestorage`);

module.exports = multer({
    storage: imagestorage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)@/)) {
            return cb(new Error(`Please upload a Image`));
        }
        cb(undefined, true);
    }
}).single(`image`);