module.exports = function (req,res,next){
    if(req.user.role === 1){
        next();
    }else{
        next({
            msg: 'Authorization failed! Your dont have access',
            status: 403
        })
    }
}