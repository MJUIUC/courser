angular.module('courser');

app.controller('accountController', function($rootScope,$scope,$http,$location,accountFactory){
	//	user object was created in html and passed here
	//	This is an event handler for the signup button
	//	I didn't want to, but using rootScope fixed the issue with the logIns..
	//	I think that it may have had something to do with the fact that multiple pages are
	//	using the same controller.

	$scope.checkLogginStatus = function(){
		accountFactory.checkLogIn().then(function(response){
			var status = response.data;
			$rootScope.loggedIn = status;
		},function(response){
			console.log("There was an error with checking log in status");
			console.log(response);
		});		
	};
	$scope.signUp = function(user){
		accountFactory.signUp(user);
	};
	$scope.logIn = function(user){
		accountFactory.logIn(user).then(function(response){
			if(response.data !== undefined){
				accountFactory.setLogInStatus(true);
				$rootScope.loggedIn = true;
				//	change the location to go to a profile later...
				$location.path('/');
			}
			else{
				console.log("in the else of login");
				$rootScope.loggedIn = false;
			}
		},function(response){
			console.log("error in loggin in: " + response);
		});
	};
	$scope.logOut = function(){
		accountFactory.logOut().then(function(response){
			console.log("logged out: " + $scope.loggedIn);
			$rootScope.loggedIn = false;
			$location.path('/');
		},function(response){
			console.log("error logging out");
		});
	};
});