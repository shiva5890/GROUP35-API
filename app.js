const express = require('express');
const config = require('./configs');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const path = require('path');

const app = express(); // server create garxa express bata


// app.use('/hello',function(req,res){
//    res.send('hello nepal')
// })

require('./db_init')


const pug = require('pug')
app.set('view engine', pug);
app.set('files', path.join(process.cwd(),'uploads'))

// import application level middleware 
const notFound = require('./middlewares/notFound')
const ticket = require('./middlewares/checkTicket')
const validate = require('./middlewares/validateTicket')


// importing router level middleware 
const authRouter = require('./controllers/auth.controller');
const userRouter = require('./controllers/user.controller')
const notifyRouter = require('./controllers/notification.controller')
const reviewRouter = require('./controllers/review.controller');
const { urlencoded } = require('express');



// morgan yota thirdpary middleware ko jasle req ko log lai print garxa 
app.use(morgan('dev'))

// console.log('Path directory ', __dirname); // jun file ma use vaako xa tyo file samma path dinxa
// console.log('root directory >>', process.cwd()); // application ko  root folder samma path dinxa


app.use(express.urlencoded({
    extended: true
})) // yo parser req.body ka kura lai parse garxa

app.use(express.json({
    extended: true
}))

// Inbuild middleware 
// => express.static() le (uploads/images) folder lai serve garxa 
// ani hami tesma vayeko file lai use garna paunxau
app.use(express.static('uploads/images')) // internal serve
app.use('/file', express.static('uploads/images')) // external serve


app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/notify',notifyRouter)
app.use('/review', reviewRouter)

// handle 404 error 
app.use(notFound)

// middleware with 4 argument is error handling middleware
// => yo middleware req,res ko bich ma aaudaina yo middleware lai next le call
//  garnu parxa error next with argument xa vane yo middleware call hunxa.
app.use(function(err,req,res,next){
    // 1st and err argument is place holder of error\
    // other three argument is simmilar to application level middleware
    res.json({
        msg: err.msg || err,
        status: err.status || 400
    })
})

app.listen(config.PORT, function(err,done){
    if(err){
        console.log('Error in server listioning', err)
    }else{
        console.log('Server listening at port', config.PORT)
        console.log('Press ctrl+c to exit server')
    }
})
