const Product = require('../models/product');
const Category = require('../models/category');

exports.getProduct = (req,res,next)=>{
    
    Product.findAll()
        .then(products =>{
            res.render('admin/product-list',{title:'Admin Product List',products:products,path:'/admin/product-list'});
        })
        .catch((err)=>{
            console.log(err);
        });
    
    
}

exports.getAddProduct = (req,res,next)=>{
    Category.findAll()
        .then((categories)=>{
            res.render('admin/add-product',
            {
            title:'New Product',
            path:'/admin/add-product',
            categories:categories
            
            });
        })
    
}
exports.postAddProduct =(req,res,next)=>{ 

    const name = req.body.name;
    const price=req.body.price;
    const description= req.body.description;
    const categoryid=req.body.categoryid;
    const user=req.user;

    user.createProduct({
        name:name,
        price:price,
        description:description,
        categoryId:categoryid
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(err=>{console.log(err)});
    
 }
 exports.getEditProduct = (req,res,next)=>{
    
    
    Product.findByPk(req.params.productid)
        .then((product)=>{
            Category.findAll()
                .then((categories=>{
    
                    res.render('admin/edit-product',
                            {
                                title:'Edit Product',
                                path:'admin/products',
                                product: product,
                                categories:categories,
                                
                            });

                }))
                .catch((err)=>{console.log(err)});
         
        })
        .catch((err)=>{
            console.log(err);
        });

}
exports.postEditProduct =(req,res,next)=>{ 
    
    const id=req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const categoryid=req.body.categoryid;
    Product.findByPk(id)
        .then(product=>{
            product.name=name;
            product.price= price;
            product.description=description;
            product.categoryId=categoryid;
            return product.save();
        })
        .then(result=>{
            console.log('uptated');
            res.redirect('/admin/product-list');
        })
        .catch();
    
}
exports.getDeleteProduct = (req,res,next)=>{
    Product.destroy({where:{id:req.params.productid}}).then(()=>{
        res.redirect('/admin/product-list');
    })
}
