var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var dbPromise = MongoClient.connect('mongodb://localhost:27017/survey-tool');

/* GET all questoins */
router.get('/questions', function(req, res, next) {
	dbPromise.then( function(db) {
	  	db.collection('questions').find().toArray(function (err, result) {
		    if (err) throw err 

			res
			.append('Access-Control-Allow-Origin','http://localhost:4200')
			.json(result);
	  	})
  	},
  	function(err) { //promise rejected
  		throw err
  	});
});

/* POST an answer */
router.post('/answers/:questionId', function(req, res, next) {
	dbPromise.then( function(db) {
		db.collection('answers').insert( {'questionId': req.params.questionId, 'answer': req.body.answer}, function (err, result) {
	    	if (err) throw err

	    	res
			.sendStatus(200);
	    })
	},
	function(err) { //promise rejected
		throw err
	});
});

module.exports = router;
