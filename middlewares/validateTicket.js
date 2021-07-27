module.exports = function(req,res,next){
    if(req.query.ticket === 'admin'){
        next();
    }else{
        next({
            msg: 'Your ticket is invalid ',
            status: 401
        })
    }
}