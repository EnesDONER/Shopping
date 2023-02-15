const User = require('../models/user');
// const Cart = require('../models/cart');
const bcyrpt = require('bcrypt');
const sgMail = require('@sendgrid/mail')
const crypto = require('crypto');
const { Console } = require('console');
const { HSTORE } = require('sequelize');
const { and, Sequelize } = require('../utility/database');
const sequelize = require('sequelize');
sgMail.setApiKey('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')

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
            const msg = {
                to: email, // Change to your recipient
                from: 'enes.doner13.1@gmail.com', // Change to your verified sender
                subject: 'Hesap Oluşturuldu.',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>Hesabınız başarılı bir şekilde oluşturuldu.</strong>',
            };
            sgMail.send(msg);
            
        }).catch(err=>{console.log(err)})
}
exports.getReset = (req,res,next)=>{
    var errorMessage=req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/reset',{
        path:'/reset-password',
        title:'Reset Password',
        errorMessage:errorMessage
    })
}
exports.postReset = (req,res,next)=>{

    const email = req.body.email;
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex');
        User.findOne({where:{email:email}})
            .then(user=>{
                if(!user){
                    req.session.errorMessage='Mail adresi bulunamadı';
                    req.session.save(function(err){
                    console.log(err);
                    return res.redirect('/reset-password');
                    })
                }
                user.resetToken=token;
                user.resetTokenExpiration=Date.now()+3600000
                return user.save();
            }).then(result=>{
                res.redirect('/');
                const msg = {
                    to: email, // Change to your recipient
                    from: 'enes.doner13.1@gmail.com', // Change to your verified sender
                    subject: 'Parola Sıfırlama',
                    html: `<strong>Parolanızı güncellemek için tıklayın.</strong>
                          <p> <a href="http://localhost:3000/reset-password/${token}"> reset password </a> </p>`  ,
                };
                sgMail.send(msg);

            }).catch(err=>{console.log(err)})

    })

}
exports.getLogout = (req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');
    });
    
}
exports.getNewPassword = (req,res,next)=>{
    const token = req.params.token;
    var errorMessage=req.session.errorMessage;
    delete req.session.errorMessage;
    User.findOne({where:{
        resetToken:token,resetTokenExpiration:{
            $gt: Date.now()
        }}
    }).then(user=>{
        res.render('account/new-password',{
            path:'/new-password',
            title:'New Password',
            errorMessage:errorMessage,
            userId:user.id.toString(),
            passwordToken:token
        })
    })
    
}
exports.postNewPassword = (req,res,next)=>{
    const newPassword = req.body.password;
    const token = req.body.passwordToken;
    const userId = req.body.userId;
    User.findOne({where:{
        resetToken:token,
        id:userId,resetTokenExpiration:{
            $gt: Date.now()
        }
     }   
    }).then(user=>{
        const hashedPassword = bcyrpt.hashSync(newPassword,10);      
        user.password=hashedPassword;
        user.resetToken= null;
        user.resetTokenExpiration= null;
        return user.save();
       
    }).then(()=>{
        res.redirect('/login');
    }).catch(err=>{console.log(err)})
    
}