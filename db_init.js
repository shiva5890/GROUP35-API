const mongoose = require('mongoose');
const dbConfog = require('./configs/db.configs')


mongoose.connect(dbConfog.conxnURL+'/'+dbConfog.dbName,{
    useUnifiedTopology:true
}, function(err,done){
    if(err){
        console.log('Error in connecting database >>')
    }else{
        console.log('Database connected successfully ')
    }
})