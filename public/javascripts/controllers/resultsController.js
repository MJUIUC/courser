angular.module('courser');

app.controller('resultsController', function($scope, searchFactory){
	$scope.getResults = function(){
		var querey = searchFactory.getQuerey();
		searchFactory.search(querey).then(function(response){
			//console.log(response);
			$scope.searchResults = response.data;
		},function(response){
			console.log(response);
		});

	};
	$scope.curCourse = function(course){
		searchFactory.setCurrentCourse(course);
	}
});