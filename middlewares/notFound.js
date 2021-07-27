module.exports = function(req,res,next){
    next({
        msg: "Not Found",
        status: 404
    })
}