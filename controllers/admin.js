const Product = require('../models/product');
const Category = require('../models/category');

exports.getProduct = (req,res,next)=>{
    
    Product.getAll()
        .then(products =>{
            res.render('admin/product-list',{title:'Admin Product List',products:products[0],path:'/admin/product-list'});
        })
        .catch((err)=>{
            console.log(err);
        });
    
    
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
    
    product.name = req.body.name;
    product.price=req.body.price;
    product.description= req.body.description;
    product.categoryid=req.body.categoryid;
    product.saveProduct().then(()=>res.redirect('/')).catch((err)=>{console.log(err)});
    
 }
 exports.getEditProduct = (req,res,next)=>{

    const categories= Category.getAll();
    Product.getById(req.params.productid)
        .then((product)=>{
            res.render('admin/edit-product',
            {
                title:'Edit Product',
                path:'admin/products',
                product: product[0][0],
                categories:categories
            });
        })
        .catch((err)=>{
            console.log(err);
        });
   
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
