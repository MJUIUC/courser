//	This is where the node modules are declared
var path = require('path')
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongostore')(session);
var mongoose = require('mongoose');
var multer = require('multer');
var app = express();
var favicon = require('serve-favicon');

//set favicon
app.use(favicon(__dirname + '/fav.ico'));

//	database connection
// var db = mongoose.connect('mongodb://localhost/courser');
//	dbuser:admin
//	dbpass:root
var db = mongoose.connect('mongodb://admin:root@ds019846.mlab.com:19846/courser');

require('./config/passport'); // pass passport for configuration

//	require the converter module
require(__dirname + '/api/xmlConvert/convert.js');

//	initiate body/cookie parser
app.use(cookieParser());
app.use(bodyParser.json());


//	set up passport
app.use(session({ 
	secret: 'courserisgreatbro'
}));
app.use(passport.initialize());
app.use(passport.session());



//	require the api modules
var accountHandeler = require(__dirname + '/api/accountApi.js');
var searchHandeler = require(__dirname + '/api/searchCourseApi.js');
var xmlJsonConvert = require(__dirname + '/api/xmlConvert/convert.js');
//	use the api
app.use('/accounts',accountHandeler);
app.use('/search',searchHandeler);
app.use('/xmlConvert', xmlJsonConvert);


//	set up app to use the whole courser folder inside courser
//	This sets the app to use these files as resources
app.use(express.static(__dirname + 'public'));
app.use('/stylesheets',express.static(__dirname + '/public/stylesheets'));
//app.use('/stylesheets',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
//app.use('/fonts',express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));
app.use('/javascripts',express.static(__dirname + '/public/javascripts'));
app.use('/javascripts',express.static(__dirname + '/factories'));
app.use('/partials',express.static(__dirname + '/public/partials'));
app.use('/images',express.static(__dirname + '/public/images'));



//	Custom View engine with angular routing
app.get('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile(path.join('public','partials','base.html'), { root: __dirname });
});

//	stole this from the auto generated express
//	small bit of error handeling
app.use(function(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//	listen on the local host port
app.listen(3000);
console.log("server is running");

//	push the app out
module.exports = app;