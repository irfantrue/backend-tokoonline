const express = require(`express`);
const router = express.Router();
const { 
    login, 
    signup 
} = require(`../controller/loginregis`);
const {
    search_product_by_kategori, 
    get_all_kategori, 
    add_kategori, 
    update_kategori, 
    delete_kategori 
} = require(`../controller/kategori`);
const {
    get_all_produk,
    detail_produk,
    add_produk,
    update_produk,
    delete_produk
} = require(`../controller/produk`);
const {
    home,
    add_cart,
    cancel_cart
} = require(`../controller/home`);
const {
    upload_image,
    delete_image
} = require(`../controller/upload`);
const {
    checkout,
    tambah_jumlah_produk,
    kurang_jumlah_produk,
    get_all_cart
} = require(`../controller/keranjang`);
const {
    detailTransaksiUser,
    get_produk_transaksi,
    update_status_transaksi,
    get_all_transaksi_user,
    delete_transaksi,
    batal_transaksi
} = require(`../controller/transaksi`);
const {
    get_pembayaran_user,
    update_pembayaran_user,
    get_pembayaran_all,
    detail_pembayaran,
    update_status_pembayaran
} = require(`../controller/pembayaran`);
const {
    identitas_navbar
} = require(`../controller/navbar`);
const {
    getDataUser,
    editDataUser
} = require(`../controller/profileUser`);
const fileSizeLimitErrorHandler = require(`../middleware/filesize`);
const imageupload = require(`../middleware/imageupload`);
const verifytoken = require(`../middleware/verifyToken`);
const verifyTokenAdmin = require(`../middleware/verifyTokenAdmin`);

// ROUTE PROFILE USER
router
    .route(`/profile`)
    .get(verifytoken, getDataUser)
    .put(verifytoken, editDataUser);

// ROUTE LOGIN
router.post(`/login`, login);

// ROUTE REGISTER
router.post(`/signup`, signup);

// ROUTE IDENTITAS NAVBAR
router.get(`/identitas-navbar`, identitas_navbar);

// ROUTE HOME
router.get(`/home-produk`, home);

// ROUTE HOME GET ALL CATEGORY
router.get(`/kategori-home`, get_all_kategori);

// ROUTE HOME SEARCH PRODUCT BY CATEGORY
router.get(`/home-produk/:slug`, search_product_by_kategori);

// ROUTE ADD CART
router.post(`/add-produk/:slug`, verifytoken, add_cart);

// ROUTE CANCEL CART
router.delete(`/delete-cart/:slug`,verifytoken, cancel_cart);

// ROUTE GET ALL KERANJANG
router.get(`/cart`, verifytoken, get_all_cart);

// ROUTE CHECKOUT
router.post(`/cart/checkout`, verifytoken, checkout);

// ROUTE TAMBAH/KURANG JUMLAH PRODUK KERANJANG
router.put(`/cart/tambah-jumlah/:id`, verifytoken, tambah_jumlah_produk);

router.put(`/cart/kurang-jumlah/:id`, verifytoken, kurang_jumlah_produk);

// ROUTE TRANSAKSI (USER)
router.get(`/transaksi-user`,verifytoken, get_produk_transaksi);

router.get(`/transaksi-user/:id`, verifytoken, detailTransaksiUser);

// ROUTE BATAL TRANSAKSI / ORDER (USER)
router.delete(`/transaksi-user/:id`, verifytoken, batal_transaksi);

// ROUTE GET ALL TRANSAKSI DATA (ADMIN)
router.get(`/transaksi`,verifytoken, get_all_transaksi_user);

router
    .route(`/transaksi/:id`)
    // ROUTE UPDATE STATUS TRANSAKSI (ADMIN)
    .put(verifytoken, update_status_transaksi)
    // ROUTE BATAL TRANSAKSI / ORDER (ADMIN)
    .delete(verifytoken, delete_transaksi);

// ROUTE PEMBAYARAN USER
router.get(`/pembayaran-user`, verifytoken, get_pembayaran_user);

// ROUTE UPDATE IMAGE PEMBAYARAN
router.put(`/pembayaran-user/:id`,verifytoken, update_pembayaran_user);

// ROUTE PEMBAYARAN ADMIN
router.get(`/pembayaran`, verifytoken, get_pembayaran_all);

// ROUTE UPDATE STATUS PEMBAYARAN BY ADMIN
router
    .route(`/pembayaran/:id`)
    .get(verifytoken, detail_pembayaran)
    .put(verifytoken, update_status_pembayaran);

// ROUTE KATEGORI
router
    .route(`/kategori`)
    // GET KATEGORI
    .get(verifytoken, get_all_kategori)
    // ADD KATEGORI
    .post(verifytoken, add_kategori);

router
    .route(`/kategori/:id`)
    // UPDATE KATEGORI
    .put(verifytoken, update_kategori)
    // DELETE KATEGORI
    .delete(verifytoken, delete_kategori);

// ROUTE UPLOAD IMAGE
router.post(`/upload-image`, verifytoken, imageupload, fileSizeLimitErrorHandler, upload_image);

// ROUTE DELETE IMAGE
router.post(`/delete-image`, verifytoken, delete_image);

// ROUTE PRODUK
router
    .route(`/produk`)
    // ADD PRODUK
    .post(verifytoken, add_produk)
    // GET ALL PRODUK
    .get(verifytoken, get_all_produk);

router
    .route(`/produk/:slug`)
    // DETAIL PRODUK
    .get(detail_produk)
    // UPDATE PRODUK
    .put(verifytoken, update_produk)
    // DELETE PRODUK
    .delete(verifytoken, delete_produk);
    
module.exports = router;
