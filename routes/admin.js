const express = require('express');
const router = express.Router();

const productsController = require('../controllers/admin')
router.get('/product-list',productsController.getProduct);
router.get('/add-product',productsController.getAddProduct);
router.post('/add-product',productsController.postAddProduct);
router.get('/products/:productid',productsController.getEditProduct);
router.post('/products',productsController.postEditProduct);



module.exports = router;
