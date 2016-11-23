angular.module('courser');

app.factory('coursePageFactory',function($http, $q){

	var courseFac = {};
	var wikiRes = {};

	courseFac.wikiSearch = function(querey){
		console.log(querey);
		$http.post('/pingWiki/wiki',querey).then(function(response){
			console.log(response);
		},function(response){
			console.log(response);
		});
	}

	return courseFac;
});