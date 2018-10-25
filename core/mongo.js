"use strict"
let config = require("../config");
let logger = require("./logger");

let MongoClient = require('mongodb').MongoClient;

let floradb = {};

logger.info("Mongodb uri --> "+config.db.uri);
MongoClient.connect(config.db.uri,{useNewUrlParser:true},config.db.options,function(err, db) {
    if (err) {
        logger.error("Could not connect to MongoDB! "+err);
        process.exit(1);
        return;
    }
    floradb.dbase = db.db("floradb");
});

floradb.collection = function(collection){
    return floradb.dbase.collection(collection);
}

floradb.closeDB = function(){
    floradb.dbase.close();
}

module.exports = floradb;