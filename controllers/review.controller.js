const router = require('express').Router();

router.route('/')
    .get(function(req,res,next){
        res.send('This is from empty review url')
    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    })

router.route('/:id')
    .get(function(req,res,next){
        res.send('This is from dynamic review url')
    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    })


module.exports = router;