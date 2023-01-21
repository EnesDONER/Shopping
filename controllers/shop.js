const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req,res,next)=>{
    const products = Product.getAll();
    const categories = Category.getAll();
    res.render('shop/index',
    {title:'Shopping',products:products,categories:categories,path:'/'});
}

exports.getProducts = (req,res,next)=>{
    const products = Product.getAll();
    const categories = Category.getAll();
    res.render('shop/products',
    {title:'Products',products:products,categories:categories,path:'/'});
}
exports.getProduct = (req,res,next)=>{
    const product = Product.getById(req.params.productid);
    res.render('shop/product-detail',{
        title:product.name,
        product:product,
        path:'/products'
    })
    res.redirect('/');
}

exports.getProductDetails = (req,res,next)=>{
    const products = Product.getAll();
    res.render('shop/details',{title:'Details',path:'/details'});
}
exports.getCart = (req,res,next)=>{
    const products = Product.getAll();
    res.render('shop/cart',{title:'Cart',path:'/cart'});
}

exports.getOrders = (req,res,next)=>{
    const products = Product.getAll();
    res.render('shop/orders',{title:'Orders',path:'/orders'});
}