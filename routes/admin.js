const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication')
const isAdmin = require('../middleware/isAdmin')
const  locals= require('../middleware/locals')
const adminController = require('../controllers/admin')
router.get('/product-list',locals,isAuthenticated,isAdmin,adminController.getProduct);
router.get('/add-product',locals,isAuthenticated,isAdmin,adminController.getAddProduct);
router.post('/add-product',locals,isAuthenticated,isAdmin,adminController.postAddProduct);
router.get('/products/:productid',locals,isAuthenticated,isAdmin,adminController.getEditProduct);
router.post('/products',locals,isAuthenticated,isAdmin,adminController.postEditProduct);
router.get('/delete/:productid',locals,isAuthenticated,isAdmin,adminController.getDeleteProduct);




module.exports = router;
