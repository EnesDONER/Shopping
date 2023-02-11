const User = require('../models/user');
// const Cart = require('../models/cart');
const bcyrpt = require('bcrypt');

exports.getLogin = (req,res,next)=>{
    var errorMessage= req.session.errorMessage;
    var successMessage= req.session.successMessage;
    delete req.session.errorMessage;
    delete req.session.successMessage;
    
    res.render('account/login',{
        path:'/login',
        title:'Login',
        errorMessage:errorMessage,
        successMessage:successMessage
    })
}
exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where:{email:email}})
        .then(user=>{
            if(!user){
                req.session.errorMessage = 'Bu mail adresi ile bir kayıt bulunamamıştır.';
                return res.redirect('login');
            }
            bcyrpt.compare(password,user.password)
                .then(isSuccess=>{
                    if(isSuccess){
                        req.session.user = user;
                        req.session.isAuthenticated=true;
                        return req.session.save(function (err){
                            var url = req.session.redirectTo || '/';
                            delete req.session.redirectTo;
                            return res.redirect(url);
                        })
                    }
                    res.redirect('/login');
                }).catch(err=>{console.log(err)})
        }).catch(err=>{console.log(err)})
    
        
}
exports.getRegister = (req,res,next)=>{
    var errorMessage= req.session.errorMessage;
    var successMessage= req.session.successMessage;
    delete req.session.errorMessage;
    delete req.session.successMessage;

    res.render('account/register',{
        path:'/register',
        title:'Register',
        errorMessage:errorMessage,
        successMessage:successMessage
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
                req.session.errorMessage='Bu mail adresi ile daha önce kayıt olunmuş';
                req.session.save(function(err){
                    console.log(err);
                    return res.redirect('/register');
                })
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
            req.session.successMessage='Başarılı bir şekilde kayıt oldunuz. Lütfen giriş yapın.';
            res.redirect('/login');
        }).catch(err=>{console.log(err)})
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
exports.getLogout = (req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');
    });
    
}