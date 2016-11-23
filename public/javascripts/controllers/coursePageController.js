angular.module('courser');

app.controller('coursePageController', function($scope, searchFactory, coursePageFactory){
	//	load the course from the searchFactory
	$scope.course = searchFactory.getCurrentCourse();
	var origQuerey = searchFactory.getQuerey();

	coursePageFactory.wikiSearch(origQuerey);
});