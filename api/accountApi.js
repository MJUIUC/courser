var express = require('express');
var router = express.Router();
var passport = require('passport');

//	load database models
var userMod = require('../models/user.js');

//	listen for signup post...
router.post('/signup',function(req,res){
	console.log(req.body);
	var user = req.body
	userMod.findOne({username: req.body.username}, function(err,isUser){
		if(isUser !== null){
			res.send("email in use");
		}
		else if(err){
			res.send("There was an error in signing up");
			next();
		}
		else{
			var newUser = userMod({
				username : user.username,
				password : user.password,
				name	: 	{Last: String, Fist: String}, 
				major	: 	String,
				comments: 	[String]
			});
			newUser.save();
			res.send(newUser);
		}
	});
});
//	listen for login post...
router.post('/login',passport.authenticate('local'),function(req,res){
	var user = req.user;
	console.log("in login");
	//	if user is in the request, then passport worked
	if(user === undefined){
		res.send(false);
	}
	else{
		res.send(user);
	}
});

router.get('/logout',function(req,res,next){
	req.logout();
	next();
});

router.get('/checkLoggedIn',function(req,res){
	console.log("checking login status...");
	var authenticated = req.isAuthenticated();
	console.log("this is authenticated status: "+ authenticated)
	res.send(authenticated);
});

//	export the router object
module.exports = router;