module.exports = (req,res,next)=>{
    if(!req.user.isAdmin){
        return res.redirect('/');
    }
    next();
}