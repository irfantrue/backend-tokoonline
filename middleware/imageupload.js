const multer = require(`multer`);
const imagestorage = require(`./imagestorage`);

module.exports = multer({
    storage: imagestorage,
    limits: {
        fileSize: 10000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|PNG|JPG)$/)) {
            return cb(new Error(`Ekstensi gambar (png/jpg/PNG/JPG)`));
        }
        cb(undefined, true);
    }
}).single(`image`);