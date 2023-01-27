const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req,res,next)=>{
    const categories = Category.getAll();
    Product.getAll()
        .then(products =>{
            res.render('shop/index',
            {title:'Shopping',products:products[0],categories:categories,path:'/'});
        })
        .catch((err)=>{
            console.log(err);
        });
    
}
exports.getProductsByCategoryId = (req,res,next)=>{
    const products = Product.getProductByCategoryId(req.params.categoryid);
    
    const categories = Category.getAll();
    
    res.render('shop/index',{
        title:'Products',
        products:products,
        categories:categories,
        selectedCategoryId:req.params.categoryid,
        path:'/'
    })

}
exports.getProducts = (req,res,next)=>{
    const products = Product.getAll();
    const categories = Category.getAll();
    res.render('shop/products',
    {title:'Products',products:products,categories:categories,path:'/products'});
}
exports.getProduct = (req,res,next)=>{
    Product.getById(req.params.productid)
        .then((product)=>{
            res.render('shop/product-detail',{
                title:product[0][0].name,
                product:product[0][0],
                path:'/products'
            });
        })
        .catch((err)=>{
            console.log(err);
        });
}


exports.getCart = (req,res,next)=>{
    const products = Product.getAll();
    res.render('shop/cart',{title:'Cart',path:'/cart'});
}

exports.getOrders = (req,res,next)=>{
    const products = Product.getAll();
    res.render('shop/orders',{title:'Orders',path:'/orders'});
}