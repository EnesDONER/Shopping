const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const sequelize = require('./utility/database');



app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404Page);

// sequelize.sync().then(result=>{
//     console.log(result)
// }).catch((err)=>console.log(err));
app.listen(3000,()=>{
    console.log("3000 portunda calisiyor");
});