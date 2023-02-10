const User = require('../models/user');
// const Cart = require('../models/cart');
const bcyrpt = require('bcrypt');

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

    User.findOne({where:{email:email}})
        .then(user=>{
            if(!user){
                return res.redirect('login');
            }
            bcyrpt.compare(password,user.password)
                .then(isSuccess=>{
                    if(isSuccess){
                        req.session.user = user;
                        req.session.isAuthenticated=true;
                        return req.session.save(function (err){
                            console.log(err);
                            res.redirect('/');
                        })
                    }
                    res.redirect('/login');
                }).catch(err=>{console.log(err)})
        }).catch(err=>{console.log(err)})
    
        
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
            const passawordhashed= bcyrpt.hashSync(password,10);
            return  User.create({name:name,email:email,password:passawordhashed});
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
