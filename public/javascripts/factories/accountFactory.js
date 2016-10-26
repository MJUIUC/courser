angular.module('courser');


app.factory('accountFactory', function($http, $q){
	var accFac = {};
	var status;
	accFac.checkLogIn  = function(){
			var defer = $q.defer();
			$http.get('/accounts/checkLoggedIn').then(function(response){
				defer.resolve(response);
			},function(response){
				console.log("response check failed");
				defer.reject(response);
			});
			return defer.promise;
		};

	accFac.getLogInStatus = function(){
		return status
	};
	accFac.setLogInStatus = function(setStat){
		status = setStat;
	};
	accFac.signUp = function(user){
			//	http post to the server
			//	with minimal password varification
			if(user.password == user.confirm){
				//	call the signup post in the accountApi
				$http.post('/accounts/signup', user).then(function(response){
					console.log("successful signup");
				},function(response){
					console.log("error signing up");
				});			
			}	
			else{
				alert("passwords must mach");
			}

		}; 
	accFac.logIn = function(user){
			var defer = $q.defer();
			$http.post('/accounts/login', user).then(function(response){
				defer.resolve(response);
			},function(response){
				console.log("login post error");
				defer.reject(response);
			});
			return defer.promise;
		};
	accFac.logOut = function(){
			var defer = $q.defer();
			$http.get('/accounts/logout').then(function(response){
				defer.resolve(response);
			},function(response){
				console.log("There was an issue logging out");
				defer.reject(response);
			});
			return defer.promise;
		};
	return accFac;
});