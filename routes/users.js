let express = require('express');
let logger = require("../core/logger");

module.exports = function(app,db){
  let router = express.Router();
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    let collection = db.collection('userAccount');
    collection.find({}).toArray(function(err, result) { // 返回集合中所有数据
      if (err) {
        logger.error("Could not find data! error:"+err);
        req.flash("error", { msg: err });
        return;
      }
      res.json(result);
    });
  });

  /* POST users listing. */
  router.post('/', function(req, res, next) {
    logger.info("user---> "+req.body.user);
    logger.info("pwd---> "+req.body.pwd);
    if(!req.body.user || !req.body.pwd){
      req.flash("error", { msg: "user and pwd can not empty!" });
    }

    let collection = db.collection('userAccount');
    var data = {"user":req.body.user,"pwd":req.body.pwd};
    collection.insert(data, function(err, result) {
      if (err) {
        logger.error("Could not find data! error:"+err);
        req.flash("error", { msg: err });
        return;
      }
      res.json(result);
    });
  });

  app.use("/users",router);
}