const express = require(`express`);
const router = express.Router();
const verifytoken = require(`../middleware/verifyToken`);
const { login, signup } = require(`../controller/loginregis`);
const { 
    getKategori, 
    addKategori, 
    updateKategori, 
    deleteKategori 
} = require(`../controller/kategori`);

// ROUTE LOGIN
router.post(`/login`, login);

// ROUTE REGISTER
router.post(`/signup`, signup);

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

module.exports = router;