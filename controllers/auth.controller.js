const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model')
const MAP_USER_REQ = require('./../helpers/map_user_req')
const uploader = require('./../middlewares/uploaders')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../configs');

const dbConfig = require('./../configs/db.configs')

function generateToken(data){
    return jwt.sign({
        _id: data._id,
        role:data.role,
        name: data.username
    }, config.JWT_SECRET, {
        expiresIn: '2days'
    })
}

router.get('/',function(req,res,next){
   
})

router.get('/login', function(req,res,next){
    
})

router.post('/login', function(req,res,next){
   UserModel.findOne({
      username: req.body.username
   })
   .then(function (user) {
      if (!user) {
          return next({
              msg: "Invalid Username",
              status: 400
          })    
      }
      var isMatched = passwordHash.verify(req.body.password, user.password);
          if(!isMatched){
              return next({
                  msg: 'invalid password',
                  status: 404
              })
          }
          if (user.status !== 'active') {
              return next({
                  msg: 'Your account is disabled please contact IT Department for support',
                  status: 400
              })
          }
     
      // if user
      // check status
      // password verfication
      // token generation
      var token = generateToken(user)
      res.json({
          user: user,
          token: token
      });
  })
  .catch(function (err) {
      next(err)
  })

})

router.get('/register', function(req,res,next){
   res.render('register.pug')
})

router.post('/register', uploader.single('image'), function(req,res,next){
  
   const data = req.body;
   if(req.fileTypeError){
       return next({
           msg: 'invalid file format',
           status: 400
       })
   }
   // prepare data 
//    console.log('uploaded file >>', req.file.filename)

   if(req.file){
       data.image = req.file.filename
   }

   const newUser = new UserModel({});
   // newUser is a mongoose object
    const newMapUser = MAP_USER_REQ(newUser,data);
    newMapUser.password = passwordHash.generate(req.body.password)
   // useUser is mongoose object so call mongoose method for db operation
   newMapUser.save(function (err, done) {
       if (err) {
           return next(err);
       }
       res.json(done);
   })

})



module.exports = router;