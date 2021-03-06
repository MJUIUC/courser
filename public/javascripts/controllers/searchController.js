angular.module('courser');

app.controller('searchController', function($scope,$http,$location,searchFactory){


	//	This commented line of code is what makes the XML scraper function work.
	//	DON'T UNCOMMENT!!!!!

	// $http.get('/xmlConvert/crawl').then(function(response){
	// 	console.log(response);
	// },function(response){
	// 	console.log(response);
	// });
	$scope.setQuereyEnter = function($event, querey){
		var keyCode = $event.which || $event.keyCode;
		if(keyCode == 13 && querey != null){
			$scope.setQuerey(querey);
		}
	}

	$scope.setQuerey = function(querey){
		if(querey != null){
			console.log("setting querey: " + querey);
			searchFactory.setQuerey(querey);
			$location.path('/resultsPage');
		}
	};
	
	$scope.addCourse = function(course){
		//	call search factory api here to add course
		searchFactory.addCourse(course).then(function(response){
			console.log("successful add");
			console.log(response);
		},function(response){
			console.log("failure adding");
			console.log(response);
		});
	};

	
});