const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req,res,next)=>{

    Product.findAll()
        .then(products => {
            Category.findAll()
                .then(categories=> {
                    console.log(categories)
                    res.render('shop/index',
                    {title:'Shopping',
                    products:products,
                    categories:categories,
                    path:'/'});
                })
                .catch((err)=>{
                    console.log(err);
                });   
        })
        .catch((err)=>{
            console.log(err);
        });
        
    
}
exports.getProductsByCategoryId = (req,res,next)=>{
    const categoryid =req.params.categoryid;
    const model= [];
    Category.findAll()
        .then(categories=>{
            model.categories=categories;
            const category = categories.find(i=>i.id==categoryid);
            return category.getProducts()
        })
        .then(products=>{
            res.render('shop/index',{
                title:'Products',
                products:products,
                categories:model.categories,
                selectedCategoryId:req.params.categoryid,
                path:'/'
            })
        })
}
exports.getProducts = (req,res,next)=>{
    Product.findAll()
        .then(products =>{
            Category.findAll()
                .then(categories=> {
                    res.render('shop/products',{
                        title:'Shopping',
                        products:products,
                        categories:categories,
                        path:'/'
                    });
                })
                .catch((err)=>{
                    console.log(err);
                });   
        })
        .catch((err)=>{
            console.log(err);
        });
}
exports.getProduct = (req,res,next)=>{
    Product.findByPk(req.params.productid)
        .then((product)=>{
            res.render('shop/product-detail',{
                title:product.name,
                product:product,
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