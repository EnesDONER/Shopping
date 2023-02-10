const User = require('../models/user');
// const Cart = require('../models/cart');

exports.getLogin = (req,res,next)=>{
    res.render('account/login',{
        path:'/login',
        title:'Login',
        isAuthenticated:req.session.isAuthenticated
    })
}
exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    if((email=='enes@gmail.com') && (password=='1234')){
        //res.cookie('isAuthenticated',true);
        req.session.isAuthenticated = true;
        res.redirect('/');
    }
    else{
        res.redirect('/login');
    }
        
}
exports.getRegister = (req,res,next)=>{
    res.render('account/register',{
        path:'/register',
        title:'Register',
        isAuthenticated:req.session.isAuthenticated
    })
}
exports.postRegister = (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let _user;
    User.findOne({where:{email:email}})
        .then(user=>{
            if(user){
                return res.redirect('/register')
            }
            return  User.create({name:name,email:email,password:password});
        })
        .then(user=>{
            _user = user;
            return user.getCart();
        })
        .then(cart=>{
            if(!cart){
                return _user.createCart();
            }
            return cart;
        })
        .then(()=>{
            res.redirect('/login');
        }).catch(err=>{console.log(err)})
    res.redirect('/login');
}
exports.getReset = (req,res,next)=>{
    res.render('account/reset',{
        path:'/reset',
        title:'Reset'
    })
}
exports.postReset = (req,res,next)=>{
    res.redirect('/login');
}
