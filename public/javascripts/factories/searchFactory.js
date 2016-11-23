angular.module('courser');

app.factory('searchFactory',function($http,$q){
	var searchFac = {};
	var searchResults = [];
	var searchQuerey = {};
	var selectedCourse = {};

	searchFac.search = function(querey){
		var defer = $q.defer();
		console.log("from search fac " + querey.text);
		if(querey === undefined){return;}
			$http.post('/search/searchCourses',querey).then(function(response){
				console.log("search response success");
				searchResults = response.data;
				defer.resolve(response);
			},function(response){
				console.log("search response failure");
				defer.reject(response);
			});
			return defer.promise;		
	};

	searchFac.getSearchResults = function(){
		return searchResults;
	};

	searchFac.setQuerey = function(querey){
		searchQuerey = {text: querey.text};
	};
	searchFac.getQuerey = function(){
		return searchQuerey;
	};
	//	store current course to be put on course specific page
	searchFac.setCurrentCourse = function(curCourse){
		selectedCourse = curCourse;
	};
	searchFac.getCurrentCourse = function(){
		return selectedCourse;
	};

	searchFac.addCourse = function(course){
			var defer = $q.defer();
			$http.post('/search/addCourse', course).then(function(response){
				console.log("course added successfully");
				console.log(response);
				defer.resolve(response);
			},function(response){
				console.log("course add failure");
				defer.reject(response);
			});
			return defer.promise;
	};
	return searchFac;
});