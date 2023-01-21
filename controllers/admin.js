const Product = require('../models/product');
const Category = require('../models/category');

exports.getProduct = (req,res,next)=>{
    const products = Product.getAll();
    res.render('admin/product-list',{title:'Admin Product List',products:products,path:'/admin/product-list'});
}

exports.getAddProduct = (req,res,next)=>{
    const categories= Category.getAll();
    res.render('admin/add-product',
    {
        title:'New Product',
        path:'/admin/add-product',
        categories:categories
    }  
        
    );
}
exports.postAddProduct =(req,res,next)=>{ 
    const product = new Product();
    product.id = (Math.floor(Math.random()*99999)+1)
    product.name = req.body.name;
    product.price=req.body.price;
    product.description= req.body.description;
    product.categoryid=req.body.categoryid;
    product.saveProduct();
    res.redirect('/');
 }
 exports.getEditProduct = (req,res,next)=>{
    const product = Product.getById(req.params.productid);
    const categories= Category.getAll();
    
    res.render('admin/edit-product',
    {
        title:'Edit Product',
        path:'admin/products',
        product: product,
        categories:categories
    }
      
    );
}
exports.postEditProduct =(req,res,next)=>{ 
    const product = Product.getById(req.body.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.categoryid=req.body.categoryid;
    Product.Update(product)
    res.redirect('/admin/product-list');
}
exports.getDeleteProduct = (req,res,next)=>{
    Product.DeleteById(req.params.productid);
    res.redirect('/admin/product-list');
}
