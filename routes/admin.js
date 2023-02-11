const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication')
const  csrf= require('../middleware/csrf')
const adminController = require('../controllers/admin')
router.get('/product-list',csrf,isAuthenticated,adminController.getProduct);
router.get('/add-product',csrf,isAuthenticated,adminController.getAddProduct);
router.post('/add-product',csrf,isAuthenticated,adminController.postAddProduct);
router.get('/products/:productid',csrf,isAuthenticated,adminController.getEditProduct);
router.post('/products',csrf,isAuthenticated,adminController.postEditProduct);
router.get('/delete/:productid',csrf,isAuthenticated,adminController.getDeleteProduct);




module.exports = router;
