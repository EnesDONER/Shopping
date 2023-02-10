const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req,res,next)=>{
    console.log(req.session.isAuthenticated);
    Product.findAll()
        .then(products => {
            Category.findAll()
                .then(categories=> {
                    res.render('shop/index',
                        {
                            title:'Shopping',                  
                            products:products,           
                            categories:categories,   
                            path:'/',
                            isAuthenticated:req.session.isAuthenticated
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

    req.user
        .getCart()
        .then(cart=>{
            return cart.getProducts()
                .then(products=>{
                    console.log(products)
                    res.render('shop/cart',{title:'Cart',path:'/cart',products:products});
                }).catch(err=>{
                    console.log(err);
                })
        }).catch(err=>{
            console.log(err);
        })

   
}
exports.postCart = (req,res,next)=>{
    const productId=req.body.productId;
    let quantity = 1;
    let userCart;
    req.user
        .getCart()
            .then(cart=>{
                userCart = cart;
                return cart.getProducts({where:{id:productId}});
            }).then(products=>{
                let product;
                if(products[0]){
                    product = products[0];
                }
                if(product){
                    quantity += product.cartItem.quantity;
                    return product; 
                }
                return Product.findByPk(productId);
            }).then(product=>{
                userCart.addProduct(product,{through:{
                    quantity:quantity
                }})
            })
            .then(()=>{
                res.redirect('cart');
            })
            .catch(err=>{
                console.log(err);
            })

   
}
exports.postDeleteCartItem = (req,res,next)=>{
    const productId = req.body.productid;
    console.log("///////////////////////////////////hata0/////")
    req.user
        .getCart()
        .then(cart=>{
            console.log("///////////////////////////////////hata1/////")

            return cart.getProducts({where:{id:productId}});
        })
        .then(products=>{
            console.log("///////////////////////////////////hata2/////")
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result=>{
            res.redirect('/cart');
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.getOrders = (req,res,next)=>{
    req.user
        .getOrders({include: ['products']})
        .then(orders=>{
            
            res.render('shop/orders',{title:'Orders',path:'/orders',orders:orders});
        })
        .catch(err=>console.log(err));

    const orders = req.body.orders;
    
}
exports.postOrder = (req,res,next)=>{
    let userCart;
    req.user
        .getCart()
            .then(cart=>{
                userCart = cart;
                return cart.getProducts();
            })
            .then(products=>{
                return req.user.createOrder()
                    .then(order=>{
                        order.addProducts(products.map(product=>{
                            product.orderItem ={
                                quantity:product.cartItem.quantity,
                                price: product.price
                            }
                            return product;
                        }));
                    })
                    .catch(err=>{console.log(err)});
            })
            .then(()=>{
                userCart.setProducts(null);
            })
            .then(()=>{
                res.redirect('/orders');
            })
            .catch(err=>{
                console.log(err);
            })
}