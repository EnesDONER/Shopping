const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin')
router.get('/product-list',adminController.getProduct);
router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.get('/products/:productid',adminController.getEditProduct);
router.post('/products',adminController.postEditProduct);
router.get('/delete/:productid',adminController.getDeleteProduct);




module.exports = router;
