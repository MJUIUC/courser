var express = require('express');
var router = express.Router();


//	Load database models
var courseModel = require('../models/course.js');


router.post('/searchCourses', function(req,res){
	//	the req should be the search querey
	var querey = req.body.text;
	console.log("searching db for: " + querey);
	//var resRank = 0;
	//	mongo text search stuff should go here
	courseModel.find({$text: {$search: querey}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).exec(function(err,searchResults){
		if(err){
			console.log("Either there was an error, or no results... I'm not sure");
			res.send(err);
		}
		else{
			res.send(searchResults);
		}
	});
});

//	This is a temporary mesure to add courses to the database
router.post('/addCourse', function(req,res,next){
	var course = req.body;
	//console.log(req.body);
	courseModel.findOne({title : course.title},function(err,result){
		console.log("This is the result: " + result);
		if(err){
			res.send("I dunno man there was an error");
		}
		else if(result !== null){
			res.send("title already exists");
		}
		else{
			var newCourse = new courseModel({
				title : course.title,
				courseNumber : course.number,
				department : course.dept,
				userRank : course.rank,
				description : course.description
			});
			newCourse.save();
			res.send("new course generated");
		}
	});
});

//	export the router object
module.exports = router;