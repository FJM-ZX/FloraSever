var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.header("Content-Type", "application/json;charset=utf-8");
  MongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
    if (err) throw err;
    var dbase = db.db("floradb");
    var collection = dbase.collection('userAccount');
    collection.find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        res.send(result);
        db.close();
    });
  });
});

module.exports = router;