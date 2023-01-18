const express = require('express');
const router = express.Router();



router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/admin/add-product">' +
    '<label for="fname">First name:</label><br>' +
    '<input type="text" id="fname" name="fname"><br>'+
    '<label for="lname">Last name:</label><br>'+
    '<input type="text" id="lname" name="lname" ><br><br>'+
    '<input type="submit" value="Submit"></form>');
});

router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports= router;