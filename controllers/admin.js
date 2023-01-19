const Product = require('../models/product')

exports.getProduct = (req,res,next)=>{
    const products = Product.getAll();
    res.render('admin/products',{title:'Admin Products',products:products,path:'/admin/products'});
}

exports.getAddProduct = (req,res,next)=>{
    res.render('admin/add-product',
    {
        title:'New Product',
        path:'/admin/add-product'}
    );
}
exports.postAddProduct =(req,res,next)=>{ 
    const product = new Product((Math.floor(Math.random()*99999)+1),req.body.name,req.body.price,req.body.description);
    product.saveProduct();
    res.redirect('/');
 }
 exports.getEditProduct = (req,res,next)=>{
    res.render('admin/edit-product',
    {
        title:'New Product',
        path:'/admin/edit-product'}
    );
}
exports.postEditProduct =(req,res,next)=>{ 

    res.redirect('/');
 }
