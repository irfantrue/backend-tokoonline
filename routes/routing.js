const express = require(`express`);
const router = express.Router();
const { login, signup } = require(`../controller/loginregis`);
const { 
    getKategori, 
    addKategori, 
    updateKategori, 
    deleteKategori 
} = require(`../controller/kategori`);
const {
    getAllProduk,
    detailProduk,
    addProduk,
    updateProduk,
    deleteProduk
} = require(`../controller/produk`);
const {
    home,
    addCart,
    cancelCart
} = require(`../controller/home`);
const {
    uploadImage,
    deleteImage
} = require(`../controller/upload`);
const fileSizeLimitErrorHandler = require(`../middleware/filesize`);
const imageupload = require(`../middleware/imageupload`);
const verifytoken = require(`../middleware/verifyToken`);

// ROUTE LOGIN
router.post(`/login`, login);

// ROUTE REGISTER
router.post(`/signup`, signup);

// ROUTE HOME
router.get(`/home-produk`, home);

// ROUTE ADD CART
router.post(`/add-produk`, verifytoken, addCart);

// ROUTE CANCEL CART
router.delete(`/delete-cart`,verifytoken, cancelCart);

// ROUTE KATEGORI
router
    .route(`/kategori`)
    // GET KATEGORI
    .get(verifytoken, getKategori)
    // ADD KATEGORI
    .post(verifytoken, addKategori);

router
    .route(`/kategori/:id`)
    // UPDATE KATEGORI
    .put(verifytoken, updateKategori)
    // DELETE KATEGORI
    .delete(verifytoken, deleteKategori);

// ROUTE UPLOAD IMAGE
router.post(`/upload-image`, verifytoken, imageupload, fileSizeLimitErrorHandler, uploadImage);

// ROUTE DELETE IMAGE
router.post(`/delete-image`, verifytoken, deleteImage);

// ROUTE PRODUK
router
    .route(`/produk`)
    // ADD PRODUK
    .post(verifytoken, addProduk)
    // GET ALL PRODUK
    .get(verifytoken, getAllProduk);

router
    .route(`/produk/:slug`)
    // DETAIL PRODUK
    .get(detailProduk)
    // UPDATE PRODUK
    .put(verifytoken, updateProduk)
    // DELETE PRODUK
    .delete(verifytoken, deleteProduk);
    
module.exports = router;