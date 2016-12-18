var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var dbPromise = MongoClient.connect('mongodb://localhost:27017/survey-tool');

/* GET all questions */
router.get('/', function(req, res, next) {
	dbPromise.then( function(db) {
	  	db.collection('questions').find().toArray(function (err, result) {
		    if (err) throw err 

			res.json(result);
	  	})
  	},
  	function(err) { //promise rejected
  		throw err
  	});
});

module.exports = router;
