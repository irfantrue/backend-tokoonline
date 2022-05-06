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
const {
    checkout,
    tambahjumlahproduk,
    kurangjumlahproduk,
    getallkeranjang
} = require(`../controller/keranjang`);
const {
    getTransaksi,
    updatStatusTransaksi,
    getAllTransaksiUser,
    batalTransaksi
} = require(`../controller/transaksi`);
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
router.post(`/add-produk/:slug`, verifytoken, addCart);

// ROUTE CANCEL CART
router.delete(`/delete-cart/:slug`,verifytoken, cancelCart);

// ROUTE GET ALL KERANJANG
router.get(`/cart`, verifytoken, getallkeranjang);

// ROUTE CHECKOUT
router.post(`/checkout`, verifytoken, checkout);

// ROUTE TAMBAH/KURANG JUMLAH PRODUK KERANJANG
router.put(`/tambah-jumlah/:id`, verifytoken, tambahjumlahproduk);

router.put(`/kurang-jumlah/:id`, verifytoken, kurangjumlahproduk);

// ROUTE TRANSAKSI
router.get(`/transaksi-user`, verifytoken, getTransaksi);

// ROUTE GET ALL TRANSAKSI DATA
router.get(`/transaksi`, verifytoken, getAllTransaksiUser);

router
    .route(`/transaksi/:id`)
    // ROUTE UPDATE STATUS TRANSAKSI (ADMIN)
    .put(verifytoken, updatStatusTransaksi)
    // ROUTE BATAL TRANSAKSI / ORDER (User)
    .delete(verifytoken, batalTransaksi);

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