const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const sequelize = require('./utility/database');
const Category= require('./models/category');
const Product= require('./models/product');
const { count } = require('console');


app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404Page);

Product.belongsTo(Category,{
    foreignKey:{
        allowNull:false
    }
});
Category.hasMany(Product);

sequelize.sync()
    .then(()=>{
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
    })
    .catch((err)=>console.log(err));

app.listen(3000,()=>{
    console.log("3000 portunda calisiyor");
});