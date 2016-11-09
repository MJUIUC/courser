var express = require('express');
var router = express.Router();
var http = require('http');
var xml2js = require('xml2js');
var courseMod = require('../../models/course.js');


var path = '';
var host = 'courses.illinois.edu';
var body = "";
var json = {};



function setHost(set){
	host = set;
};
function getHost(){
	return host;
};
function setPath(set){
	path = set;
};
function getPath(){
	return path;
};

setPath('/cisapp/explorer/schedule/2016/fall/ECE.xml');

router.get('/crawl', function(req,res){

	webService(getPath());

	setTimeout(function(){
		if(json['ns2:subject'] !== undefined){
			pullInfo(json['ns2:subject']);
		}
	},500);

	res.send(json);
});

	//	recursive function might go here?
	function pullInfo(usefulJson){
		//console.log("we in?");
		if(usefulJson.calendarYears !== undefined){
			console.log("what");
		}
		else if(usefulJson.courses !== undefined){
			var	course = usefulJson.courses.course;
			var courseList = [];
			for(var i = 0; i < course.length; i++){
				//	console.log(course[i]._ + " " + course[i].$.id);
				//	should enter the courses in the database here or something...
				//	if the course is already in the db then it should be skipped
				//	if not, then it should be added or something..
				//	also have to work on the names for each of the 
				var link = course[i].$.href;
				var path = link.split('.edu');


				//console.log(name+" "+id+" "+path);

				var options = {
					host : host,
					path : path[1]	
				};
				

				http.get(options,function(res){
					var bod = ""
					res.on('data', function(d){
						bod += d;
					});
					res.on('end', function(){
						var parser = xml2js.Parser({trim: true, explicitArray:false});
						parser.parseString(bod,function(err,result){
							//console.log(result);
							var x = result['ns2:course'];

							//	Enter in the DB here prolly

							var name = x.label;
							var courseCode = x.$.id;
							var description = x.description;
							var hours = x.creditHours
							var preReq = x.courseSectionInformation
							//console.log(name+" "+courseCode+" "+description);

							//	DONT FORGET TO CHANGE THE NAME OF THE CLASS

							courseMod.findOne({courseCode : courseCode},function(err,result){
								if(result){
									console.log("already there");
								}
								else{
									console.log("added");
									var newCourse = courseMod({
											name : name,
											department : 'ECE',
											courseCode : courseCode,
											userRank : 0,
											hours	: hours,
											preReq	: preReq,
											description : description
									});
									newCourse.save();								
								}
							});


						});
					});
				}).end();
			}
		}
	};

	function webService(path){
		//	make html call with the path provided
		//console.log(host);
		// console.log("path from the webservice function: " + path);
		
		http.get({host: host,path: path},function(res){
			res.on('data', function(d){
				body += d;
			});
			res.on('end', function(){
				//	call xml converter here
				var parser = xml2js.Parser({trim: true, explicitArray:false});
				parser.parseString(body,function(err,result){
					//console.log("In the parse string function");
					if(err){
						console.log("There was an error in parsing"+err);
					}
					else{
						json = result;
					}
					//json = result;
					//console.log(result);

				});
			});
		}).end();
	};

module.exports = router;