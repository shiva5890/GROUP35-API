const mongodb = require('mongodb')
const conxnURL = 'mongodb://localhost:27017';
const dbName = 'group35db';
const MongoClient = mongodb.MongoClient;
const OID = mongodb.ObjectID;


module.exports = {
    conxnURL,
    dbName,
    MongoClient,
    OID
}