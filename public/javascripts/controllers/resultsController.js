angular.module('courser');

app.controller('resultsController', function($scope, searchFactory){

	$scope.noResults = false;
	$scope.size = 10;

	$scope.getResults = function(){
		var querey = searchFactory.getQuerey();
		searchFactory.search(querey).then(function(response){
			//console.log(response);
			if(response.data == 0){
				$scope.noResults = true;
				//console.log($scope.noResults);
			}
			else{
				$scope.searchResults = response.data;
			}
		},function(response){
			console.log(response);
		});

	};
	$scope.curCourse = function(course){
		searchFactory.setCurrentCourse(course);
	};
	
});