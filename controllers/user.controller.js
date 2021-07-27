const router = require('express').Router();

const { ObjectID } = require('mongodb');
const dbConfig = require('./../configs/db.configs')

function connection(cb){
    dbConfig.MongoClient.connect(dbConfig.conxnURL, {
        useUnifiedTopology: true
    }, function(err,client){
        if(err){
            cb(err)
        }else{
            const db = client.db(dbConfig.dbName);
            cb(null,db)
        }
    })
}

router.route('/')
    .get(function(req,res,next){
        connection(function(err,db){
            if(err){
                return next(err);
            }
            db
                .collection('users')
                .find({})
                .toArray(function(err,done){
                    if(err){
                        return next(err)
                    }
                    res.json(done)
                })
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
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    })


router.route('/:id')
    .get(function(req,res,next){
        var id = req.params.id
        connection(function(err,db){
           if(err){
               return next(err)
           }
           db.collection('users').find({
               _id : dbConfig.OID(id)
           })
           .toArray(function(err,user){
               if(err){
                   return next(err)
               }
               res.json(user)
           })
       })
    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){
        connection(function(err,db){
            if(err){
                return next(err)
            }
            db.collection('users').update({
                _id: new dbConfig.OID(req.params.id)
            },{
                $set: req.body
            }, function(err,updated){
                if(err){
                    return next(err)
                }
                res.json(updated)
            })
        })
    })
    .delete(function(req,res,next){
        const id = req.params.id
        connection(function(err,db){
            if(err){
                return next(err)
            }
            db.collection('users').remove({
                _id: new dbConfig.OID(id)
            })
            .then(function(done){
                res.json(done)
            })
            .catch(function(err){
                res.json(err)
            })
        })
    })



module.exports = router;