const Product = require('../models/product')

exports.getProduct = (req,res,next)=>{
    const products = Product.getAll();
    res.render('admin/product-list',{title:'Admin Product List',products:products,path:'/admin/product-list'});
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
    const product = Product.getById(req.params.productid);
    
    res.render('admin/edit-product',
    {
        title:'Edit Product',
        path:'admin/products',
        product: product
    }
      
    );
}
exports.postEditProduct =(req,res,next)=>{ 
    const product = Product.getById(req.body.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    Product.Update(product)
    res.redirect('/admin/product-list');
}
exports.getDeleteProduct = (req,res,next)=>{
    Product.DeleteById(req.params.productid);
    res.redirect('/admin/product-list');
}
