var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'http://techulus.cloudapp.net:9200',
	log: 'trace'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Todo App' });
});

router.get('/add/:id/:value', function(req, res, next) {
	client.create({
  index: 'testing',
  type: 'string',
  id: req.params.id,
  body: {
    title: req.params.value,
    published: true,
    published_at: '2013-01-01',
    counter: 1
  }
}, function (error, response) {
	res.render('index', { title: 'Added', msg: JSON.stringify(response) });	
});
});

router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;
	client.get({
		index: 'testing',
		type: 'string',
		id: id
	}, function (error, response) {
		res.render('index', { title: 'Result for ID : '+id, msg: JSON.stringify(response) });	
	});
});

module.exports = router;
