const express = require('express');
const router = express.Router();

const productsController = require('../controllers/admin')

router.get('/add-product',productsController.getAddProduct);
router.post('/add-product',productsController.postAddProduct);
router.get('/edit-product',productsController.getEditProduct);
router.post('/edit-product',productsController.postEditProduct);
router.get('/product-list',productsController.getProduct);


module.exports = router;
