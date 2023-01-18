const express = require('express');
const router = express.Router();
const path = require('path');
const admin = require('./admin');
router.get('/',(req,res,next)=>{

    res.render('index',{title:'Hompage',products:admin.products,path:'/'});
})

module.exports = router;