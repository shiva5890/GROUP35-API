const fs = require('fs');

function myFile(fileName, content){
    return new Promise(function(resolve,reject){
        fs.writeFile('./files/'+fileName,content, function(err,done){
            if(err){
                reject(err);
            }else{
                resolve(done);
            }
        })
                
    })
}

function myRead(fileName){
    return new Promise(function(resolve,reject){
        var readata = fs.readFile('./files/'+fileName, function(err,done){
            if(err){
                reject(err);
            }else{
                resolve(done);
            }
        })
                
    })
}

module.exports = {
    w: myFile,
    r: myRead
}