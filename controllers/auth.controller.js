const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model')
const MAP_USER_REQ = require('./../helpers/map_user_req')
const uploader = require('./../middlewares/uploaders')

const dbConfig = require('./../configs/db.configs')


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
      res.json(user);
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
   // prepare data 
   console.log('uploaded file >>', req.file)

   const newUser = new UserModel({});
   // newUser is a mongoose object
    const newMapUser = MAP_USER_REQ(newUser,data )
   // useUser is mongoose object so call mongoose method for db operation
   newUser.save(function (err, done) {
       if (err) {
           return next(err);
       }
       res.json(done);
   })

})



module.exports = router;