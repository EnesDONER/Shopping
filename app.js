const express =require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');

const userRoutes = require('./routes/user');

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoutes.routes);
app.use(userRoutes);

app.use((req,res)=>{
    res.status(404);
    res.render('404',{title:'Error',path:'/error'})
});
app.listen(3000,()=>{
    console.log("3000 portunda calisiyor");
});