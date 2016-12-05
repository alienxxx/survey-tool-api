var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

var questions

MongoClient.connect('mongodb://localhost:27017/survey-tool', function (err, db) {
  if (err) throw err

  db.collection('questions').find().toArray(function (err, result) {
    if (err) throw err

    this.questions = result
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res
  .append('Access-Control-Allow-Origin','http://localhost:4200')
  .send(this.questions);
});

module.exports = router;
