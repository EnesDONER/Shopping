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
    Category.getAll()
        .then((categories)=>{
            res.render('admin/add-product',
            {
            title:'New Product',
            path:'/admin/add-product',
            categories:categories[0]
            });
        })
        .catch((err)=>{console.log(err)})
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
    
    
    Product.getById(req.params.productid)
        .then((product)=>{
            Category.getAll()
                .then((categories=>{
                    Category.getCategoryByProductId(req.params.productid)
                        .then((selectedCategory)=>{
                            console.log(selectedCategory[0][0].name);
                            res.render('admin/edit-product',
                            {
                                title:'Edit Product',
                                path:'admin/products',
                                product: product[0][0],
                                categories:categories[0],
                                selectedCategory: selectedCategory[0][0].id
                            });
                        })
                        .catch((err)=>{console.log(err)});
                }))
                .catch((err)=>{console.log(err)});
         
        })
        .catch((err)=>{
            console.log(err);
        });

}
exports.postEditProduct =(req,res,next)=>{ 
    const product = new Product();
    product.id=req.body.id;
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.categoryid=req.body.categoryid;
    Product.Update(product)
        .then(()=>{
            res.redirect('/admin/product-list');
        })
        .catch((err)=>{console.log(err);})
    
}
exports.getDeleteProduct = (req,res,next)=>{
    Product.DeleteById(req.params.productid).then(()=>{
        res.redirect('/admin/product-list');
    })
}
