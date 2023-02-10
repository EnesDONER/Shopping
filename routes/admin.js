const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication')

const adminController = require('../controllers/admin')
router.get('/product-list',isAuthenticated,adminController.getProduct);
router.get('/add-product',isAuthenticated,adminController.getAddProduct);
router.post('/add-product',isAuthenticated,adminController.postAddProduct);
router.get('/products/:productid',isAuthenticated,adminController.getEditProduct);
router.post('/products',isAuthenticated,adminController.postEditProduct);
router.get('/delete/:productid',isAuthenticated,adminController.getDeleteProduct);




module.exports = router;
