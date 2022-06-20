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
    identitas_navbar,
} = require(`../controller/navbar`);
const {
    getDataUser,
    editDataUser
} = require(`../controller/profileUser`);
const {
    getLaporanTransaksi,
} = require(`../controller/laporanTransaksi`);
const {
    sortingProdukKodeAtoZ,
    sortingProdukKodeZtoA,
    sortingKategoriAtoZ,
    sortingKategoriZtoA,
    sortingNamaProdukAToZ,
    sortingNamaProdukZToA,
    sortingHargaProdukTerendah,
    sortingHargaProdukTertinggi,
} = require(`../controller/Admin/sortPageProduk`);
const {
    sortAdminKategoriKodeAtoZ,
    sortAdminKategoriKodeZtoA,
    sortingAdminKategoriAtoZ,
    sortingAdminKategoriZtoA,
    sortingIdAdminKategoriTerendah,
    sortingIdAdminKategoriTertinggi
} = require(`../controller/Admin/sortPageKategori`);
const {
    sortTransaksiAdminKodeAtoZ,
    sortTransaksiAdminKodeZtoA,
    sortTransaksiAdminProdukAtoZ,
    sortTransaksiAdminProdukZtoA,
    sortTransaksiAdminPelangganAtoZ,
    sortTransaksiAdminPelangganZtoA,
    sortTransaksiAdminTanggalTerbaru,
    sortTransaksiAdminTanggalTerlama,
    sortTransaksiAdminTotalHargaTerendah,
    sortTransaksiAdminTotalHargaTertinggi,
    sortTransaksiAdminStatusAToZ,
    sortTransaksiAdminStatusZToA
} = require(`../controller/Admin/sortPageTransaksi`);
const {
    sortPembayaranKodeAtoZ,
    sortPembayaranKodeZtoA,
    sortDetailAToZ,
    sortDetailZToA,
    sortNamaAToZ,
    sortNamaZToA,
    sortTeleponTertinggi,
    sortTeleponTerendah,
    sortTotalHargaTertinggi,
    sortTotalHargaTerendah,
    sortStatusAToZ,
    sortStatusZToA
} = require(`../controller/Admin/sortPagePembayaran`);
const  {
    sortingNamaProdukByKategoriAToZ,
    sortingNamaProdukByKategoriZToA,
    sortingHargaProdukByKategoriTertinggi,
    sortingHargaProdukByKategoriTerendah
} = require(`../controller/sortPageProdukKategori`);
const fileSizeLimitErrorHandler = require(`../middleware/filesize`);
const imageupload = require(`../middleware/imageupload`);
const verifytoken = require(`../middleware/verifyToken`);

router.post(`/laporan-transaksi-pdf`, getLaporanTransaksi);
// ROUTE SORTING DASHBOARD ADMIN

router.get(`/sorting-produk-kode-a-to-z`, sortingProdukKodeAtoZ);

router.get(`/sorting-produk-kode-z-to-a`, sortingProdukKodeZtoA);

router.get(`/sorting-nama-produk-a-to-z`, sortingNamaProdukAToZ);

router.get(`/sorting-nama-produk-z-to-a`, sortingNamaProdukZToA);

router.get(`/sorting-harga-produk-terendah`, sortingHargaProdukTerendah);

router.get(`/sorting-harga-produk-tertinggi`, sortingHargaProdukTertinggi);

router.get(`/sorting-nama-kategori-a-to-z`, sortingKategoriAtoZ);

router.get(`/sorting-nama-kategori-z-to-a`, sortingKategoriZtoA);

// ROUTE KATEGORI
router.get(`/sorting-admin-kategori-kode-a-to-z`, sortAdminKategoriKodeAtoZ);

router.get(`/sorting-admin-kategori-kode-z-to-a`, sortAdminKategoriKodeZtoA);

router.get(`/sorting-admin-kategori-a-to-z`, sortingAdminKategoriAtoZ);

router.get(`/sorting-admin-kategori-z-to-a`, sortingAdminKategoriZtoA);

router.get(`/sorting-admin-idkategori-terendah`, sortingIdAdminKategoriTerendah);

router.get(`/sorting-admin-idkategori-tertinggi`, sortingIdAdminKategoriTertinggi);

// ROUTE SORTING DASHBOARD ADMIN
// ROUTE TRANSAKSI
router.get(`/sort-admin-transaksi-kode-a-to-z`, sortTransaksiAdminKodeAtoZ);

router.get(`/sort-admin-transaksi-kode-z-to-a`, sortTransaksiAdminKodeZtoA);

router.get(`/sort-admin-transaksi-produk-a-to-z`, sortTransaksiAdminProdukAtoZ);

router.get(`/sort-admin-transaksi-produk-z-to-a`, sortTransaksiAdminProdukZtoA);

router.get(`/sort-admin-transaksi-pelanggan-a-to-z`, sortTransaksiAdminPelangganAtoZ);

router.get(`/sort-admin-transaksi-pelanggan-z-to-a`, sortTransaksiAdminPelangganZtoA);

router.get(`/sort-admin-transaksi-tanggal-terbaru`, sortTransaksiAdminTanggalTerbaru);

router.get(`/sort-admin-transaksi-tanggal-terlama`, sortTransaksiAdminTanggalTerlama);

router.get(`/sort-admin-transaksi-total-harga-tertinggi`, sortTransaksiAdminTotalHargaTertinggi);

router.get(`/sort-admin-transaksi-total-harga-terendah`, sortTransaksiAdminTotalHargaTerendah);

router.get(`/sort-admin-transaksi-status-a-to-z`, sortTransaksiAdminStatusAToZ);

router.get(`/sort-admin-transaksi-status-z-to-a`, sortTransaksiAdminStatusZToA);

// ROUTE PEMBAYARAN
router.get(`/sort-admin-pembayaran-kode-a-to-z`, sortPembayaranKodeAtoZ);

router.get(`/sort-admin-pembayaran-kode-z-to-a`, sortPembayaranKodeZtoA);

router.get(`/sort-admin-pembayaran-detail-a-to-z`, sortDetailAToZ);

router.get(`/sort-admin-pembayaran-detail-z-to-a`, sortDetailZToA);

router.get(`/sort-admin-pembayaran-telepon-tertinggi`, sortTeleponTertinggi);

router.get(`/sort-admin-pembayaran-telepon-terendah`, sortTeleponTerendah);

router.get(`/sort-admin-pembayaran-nama-a-to-z`, sortNamaAToZ);

router.get(`/sort-admin-pembayaran-nama-z-to-a`, sortNamaZToA);

router.get(`/sort-admin-pembayaran-total-harga-tertinggi`, sortTotalHargaTertinggi);

router.get(`/sort-admin-pembayaran-total-harga-terendah`, sortTotalHargaTerendah);

router.get(`/sort-admin-pembayaran-status-a-to-z`, sortStatusAToZ);

router.get(`/sort-admin-pembayaran-status-z-to-a`, sortStatusZToA);

// SORTING PRODUK BY KATEGORI FOR USER
router.get(`/sort-produk-by-kategori-a-to-z/:slug`, sortingNamaProdukByKategoriAToZ);

router.get(`/sort-produk-by-kategori-z-to-a/:slug`, sortingNamaProdukByKategoriZToA);

router.get(`/sort-produk-by-kategori-harga-tertinggi/:slug`, sortingHargaProdukByKategoriTertinggi);

router.get(`/sort-produk-by-kategori-harga-terendah/:slug`, sortingHargaProdukByKategoriTerendah);


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
