const express =require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');

const userRoutes = require('./routes/user');


app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoutes);
app.use(userRoutes);

app.use((req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'/views/404.html'))
});
app.listen(3000,()=>{
    console.log("3000 portunda calisiyor");
});