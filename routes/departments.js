var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var dbPromise = MongoClient.connect('mongodb://localhost:27017/survey-tool');

/* GET all departments */
// TODO: select only departments for this user
router.get('/', function(req, res, next) {
	dbPromise.then( function(db) {
	  	db.collection('departments').find({'members':'rhaynberg'},{'name':1}).toArray(function (err, result) {
		    if (err) throw err 

			res.json(result);
	  	})
  	},
  	function(err) { //promise rejected
  		throw err
  	});
});

/* GET one department */
router.get('/:id', function(req, res, next) {
	var oid = new ObjectId(req.params.id);

	dbPromise.then( function(db) {
	  	db.collection('departments').findOne(oid,function (err, result) {
		    if (err) throw err 

			res.json(result);
	  	})
  	},
  	function(err) { //promise rejected
  		throw err
  	});
});

/* GET all questions */
// TODO: select only questsions for this department
router.get('/:id/questions', function(req, res, next) {
	var oid = new ObjectId(req.params.id);

	dbPromise.then( function(db) {
	  	db.collection('questions').find({'departments':oid,'enabled':true},{'departments':false}).toArray(function (err, result) {
		    if (err) throw err 

			res.json(result);
	  	})
  	},
  	function(err) { //promise rejected
  		throw err
  	});
});

/* UPDATE the department's answers */
router.put('/:id/answers', function(req, res, next) {
	var oid = new ObjectId(req.params.id);

	dbPromise.then( function(db) {
		db.collection('departments').update({'_id':oid}, {'$set': {'answers': req.body}}, function (err, result) {
	    	if (err) throw err

	    	res.sendStatus(200);
	    })
	},
	function(err) { //promise rejected
		throw err
	});
});

module.exports = router;
