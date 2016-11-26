angular.module('courser');

app.controller('coursePageController', function($scope, searchFactory, coursePageFactory){
	//	load the course from the searchFactory
	$scope.course = searchFactory.getCurrentCourse();
	var origQuerey = searchFactory.getQuerey();

	var wiki = coursePageFactory.wikiSearch(origQuerey);

	//var wikipage = wiki.$$state.value.data.query.pages;
	//console.log(wiki);
	//console.log(wiki);
});