var mongoose = require('mongoose');

//	defining Schema for courses

var Schema = mongoose.Schema;
//	This will be the schema for the courses
var courseSchema = new Schema({
	name : String,
	courseCode : String,
	department : String,
	userRank : Number,
	hours	: String,
	preReq	: String,
	description : String
});

module.exports = mongoose.model('Course', courseSchema);