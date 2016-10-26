var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//	defining schema for users

var Schema = mongoose.Schema;

var userSchema = new Schema({
		username:	String,
		password:	String,
		name	: 	{Last: String, Fist: String}, 
		major	: 	String,
		comments: 	[String]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);