const express = require('express');
const { dirname } = require('path');
const router = express.Router();
const path = require('path');



router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
});
router.get('/add-product',(req,res,next)=>{
    res.sendFile( path.join(__dirname,'../','views/add-product.html'))
});

module.exports= router;