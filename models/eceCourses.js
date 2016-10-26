var mongoose = require('mongoose');
var Course = require('courseSchema');
//	defining Schema for ece courses

var Schema = mongoose.Schema;
//	This should probably just be a holder for an array of ece courses...
var eceCourseSchema = new Schema({
	courses : [{
		type : ObjectId,
		ref : Course
	}]
});

module.exports = mongoose.model('ECE', eceCourseSchema);