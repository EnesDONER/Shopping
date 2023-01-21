module.exports.get404Page = (req,res)=>{
    res.status(404);
    res.render('error/404',{title:'Error',path:'/error'})
}