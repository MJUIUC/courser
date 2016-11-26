angular.module('courser');

app.factory('coursePageFactory',function($http, $q){

	var courseFac = {};
	var wikiRes = {};

	courseFac.wikiSearch = function(querey){
		//console.log(querey);
		var defer = $q.defer();
		$http.post('/pingWiki/wiki',querey).then(function(response){
			console.log(response);
			defer.resolve(response);
		},function(response){
			defer.reject(response);
		});
		return defer.promise;
	}

	return courseFac;
});