const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const sequelize = require('./utility/database');
const Category= require('./models/category');
const Product= require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const { count } = require('console');


app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    User.findByPk(1)
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err=>{
            console.log(err);
        })
})


app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404Page);

Product.belongsTo(Category,{
    foreignKey:{
        allowNull:false
    }
});
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

let _user;

sequelize
    //.sync({force:true})
    .sync()
    .then(()=>{

        User.findByPk(1)
            .then(user=>{
                if(!user){
                   return  User.create({name:'enes',email:'enes@gmail.com'});
                }
                return user;
            })
            .then(user=>{
                _user = user;
                return user.getCart();
                
               
            }).then(cart=>{
                if(!cart){
                    return _user.createCart();
                }
                return cart;
            }).then(count=>{
                Category.count()
                .then(count=>{
                    if(count===0){
                        Category.bulkCreate([
                            {name:'Telefon'},
                            {name:'Bilgisayar'},
                            {name:'Tablet'}
                        ]);
                    }   
                });
            });
    })
    .catch((err)=>console.log(err));

app.listen(3000,()=>{
    console.log("3000 portunda calisiyor");
});