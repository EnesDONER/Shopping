const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const accountRoutes = require('./routes/account');
const errorsController = require('./controllers/errors');
const sequelize = require('./utility/database');
const Category= require('./models/category');
const Product= require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var mySQLStore = require('express-mysql-session')(session);


app.set('view engine','pug');
app.set('views','./views');

//session
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '425385',
	database: 'node-app'
};

var sessionStore = new mySQLStore(options); 

app.use(session({
    secret:'keybord cat',
    resave: false,
    saveUninitialized :false,
    cookie:{
        maxAge:3600000},
    store: sessionStore
}))


//middleware


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
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(accountRoutes);
app.use(errorsController.get404Page);


//database
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

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product,{through:OrderItem});
Product.belongsToMany(Order,{through:OrderItem})


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