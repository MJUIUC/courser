var express = require('express');
var router = express.Router();
var wikipedia = require('wikipedia-js');

//https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=machine%20learning

var host = 'en.wikipedia.org';
var path = '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
var body = "";
//var wikiJson = {};

router.post('/wiki', function(req,res){
	//	the req should be the search querey
	console.log("inside pingWiki");
	var query = req.body.text;

	var options = {query: query, format: "json", summaryOnly: true};

	wikipedia.searchArticle(options, function(err, Wikires){

		if(err){
			console.log(err);
		}
		else{
			res.send(Wikires);
		}

	});

});


module.exports = router;