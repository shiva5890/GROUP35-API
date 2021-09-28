const router = require('express').Router();

const { ObjectID } = require('mongodb');
const dbConfig = require('./../configs/db.configs')
const UserModel = require('./../models/user.model')
const MAP_USER_REQ = require('./../helpers/map_user_req')
const uploader = require('./../middlewares/uploaders')

router.route('/')
    .get(function(req,res,next){
        var condition = {};
        UserModel
            .find(condition)
            .sort({
                _id: -1
            })
            .limit()
            .skip()
            .exec(function (err, users) { // query build ga
                if (err) {
                    return next(err);
                }
                res.json(users);
            })
       
    })
    .post(function(req,res,next){

    })

router.route('/search')
    .get(function(req,res,next){
        res.send('This is from search user handler')
    })
    .post(function(req,res,next){

    })



router.route('/:id')
    .get(function(req,res,next){
        var id = req.params.id;
        UserModel.findById(id, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next({
                    msg: 'User Not Found',
                    status: 404
                })
            }
            res.json(user);
        })

       
    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){
       const id = req.params.id;
       const data = req.body;
       UserModel.findById(id,function(err, user){
           if(err){
               return next(err);
           }
           if(!user){
               return next({
                   msg: 'User Not Found',
                   status: 404
               })
           }
           const updatedUser = MAP_USER_REQ(user, data)
            // (data file upload garera data prepare garnu paxa)
            updatedUser.save(function(err,updated){
                if(err){
                    return next(err)
                }
                res.json(updated)
            })
       })
    })
    .delete(function(req,res,next){
        var id = req.params.id;
        UserModel.findById(id,function(err,user){
            if(err){
                return next(err);
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            user.remove(function(err,removed){
                if(err){
                    return next(err)
                }
                res.json(removed)
            })
        })
    })

module.exports = router;