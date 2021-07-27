module.exports = function(req,res,next){
    if(req.query.ticket){
        next();
    }else{
        next({
            msg: 'You do not have ticket ',
            status: 401
        })
    }
}