const express = require('express');
const router = express.Router();

const dbConfig = require('./../configs/db.configs')


router.get('/',function(req,res,next){
    res.render('index.pug',{
        title: 'react js',
        message: 'let learn react js'
    })
})

router.get('/login', function(req,res,next){
    res.render('login.pug',{
       data : req.body
    })
})

router.post('/login', function(req,res,next){
   dbConfig.MongoClient.connect(dbConfig.conxnURL,{
    useUnifiedTopology: true
   },function(err, client){
       if(err){
           return next(err)
       }
       const db = client.db(dbConfig.dbName);
       db.collection('users')
       .find({
           username: req.body.username
       })
       .toArray(function(err,done){
        if(err){
            return next(err)
        }
        res.json(done)
    })
   })
})

router.get('/register', function(req,res,next){
   res.render('register.pug')
})

router.post('/register', function(req,res,next){
    dbConfig.MongoClient.connect(dbConfig.conxnURL, function(err,client){
        if(err){
            return next(err)
        }
        const selectedDb = client.db(dbConfig.dbName);
        selectedDb
            .collection('users')
            .insertOne(req.body, function(err,done){
                if(err){
                    return next(err)
                }
                res.json(done)
            })
    })
})



module.exports = router;