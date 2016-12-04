var express = require('express');
var router = express.Router();
var http = require('http');
var xml2js = require('xml2js');
var courseMod = require('../../models/course.js');


var path = '';
var host = 'courses.illinois.edu';
var body = "";
var json = {};
var json2 = {};
var classList = [];
//var dept = 'AGCM'


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

setPath('/cisapp/explorer/schedule/2016/fall.xml');

router.get('/crawl', function(req,res){

	webService(getPath());


			// 	if(json['ns2:subject'] !== undefined){
			// 		pullInfo(json['ns2:subject']);
			// 	}


	//	There are 178 different course id things...
	//	So then you need to loop 178 times for each course?
	setTimeout(function(){

		obj = json['ns2:term'].subjects.subject;
		var count = 0;
		//console.log(obj);
		for(var count in obj){
			var curObj = obj[count];
			var dept = curObj.$.id;

			//setPath('/cisapp/explorer/schedule/2016/fall/'+dept+'.xml');
			//console.log(dept);
			classList.push(dept);
			if(count < 178 && count >= 150){
				//console.log(count);
				loopTimeout(dept,count);
			}
			else{
				continue;
			}
			
			// setTimeout(function(){
			// 	//var path = '/cisapp/explorer/schedule/2016/fall/'+dept+'.xml';
			// 	console.log(dept);



			// },count+200);


		}

		function loopTimeout(dept,count){
			setTimeout(function(){
				//console.log(dept + ' ' + count);
				var paths = '/cisapp/explorer/schedule/2016/fall/'+dept+'.xml';
				console.log(paths);
				var bod2 = "";
				http.get({host: host,path: paths},function(res){
					res.on('data', function(d){
						bod2 += d;
					});
					res.on('end', function(){
						//	call xml converter here
						var parser = xml2js.Parser({trim: true, explicitArray:false});
						parser.parseString(bod2,function(err,sem){
							//console.log("In the parse string function");
							if(err){
								console.log("There was an error in parsing"+err);
							}
							else{
								//console.log(sem);
									if(sem['ns2:subject'] !== undefined){
										//console.log(dept);
										pullInfo(sem['ns2:subject'],dept);
									}
							}
							//json = result;
							//console.log(result);

						});
					});
				}).end();


			},count+50)
		}
		
	},300);

	res.send(json);
});

	
	function pullInfo(usefulJson,dept){
		console.log(dept);
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
									console.log(result.name+':      '+"already there");
								}
								else{
									console.log(name+':      '+"added");
									var newCourse = courseMod({
											name : name,
											department : dept,
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
		 console.log("path from the webservice function: " + path);
		
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
						//console.log(result);
					}
					//json = result;
					//console.log(result);

				});
			});
		}).end();
	};

module.exports = router;