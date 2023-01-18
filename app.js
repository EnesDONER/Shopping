const express =require('express');
const app = express();

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

const userRoutes = require('./routes/user');


app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoutes);
app.use(userRoutes);
// app.get('/',(req,res)=>{
//     res.send('<h1>aEFH</h1>')
// })

app.listen(3000,()=>{
    console.log("3000 portunda çalısıyor");
});