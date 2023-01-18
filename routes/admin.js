const express = require('express');
const router = express.Router();


const products = [
    {id:1, name: 'Samsung S8', price:3000, description:'kötü telefon'},
    {id:2, name: 'Xiaomi Note 9', price:5000, description:'mükemmel telefon'},
    {id:3, name: 'Iphone X', price:13000, description:'eh telefon'},
    {id:4, name: 'Iphone 14 Pro', price:33000, description:'berabat telefon'}
]
router.get('/add-product',(req,res,next)=>{
    res.render('add-product',
    {
        title:'AddaNewProduct',
        path:'/admin/add-product'}
    );
});
router.post('/add-product',(req,res,next)=>{
   products.push({id:5,name:req.body.name,price:req.body.price,description:req.body.description})
    res.redirect('/');
});


module.exports.routes= router;
module.exports.products=products;