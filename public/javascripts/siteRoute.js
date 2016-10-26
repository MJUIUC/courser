var app = angular.module('courser',['ngRoute']);

	app.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/',{
				templateUrl:'/partials/home.html'
			})
		.when('/about',{
				templateUrl:'/partials/about.html'
			})
		.when('/contact',{
				templateUrl:'/partials/contact.html'
			})
		.when('/signUp',{
				templateUrl:'/partials/signUp.html',
				controller:'accountController'
			})
		.when('/logIn',{
				templateUrl:'/partials/logIn.html',
				controller:'accountController'
			})
		.when('/resultsPage',{
				templateUrl:'/partials/results.html'
			})
		.when('/addCourse',{
				templateUrl:'/partials/addCourse.html'
			})
		.otherwise({
				template:"No page here..."
			});



		//	using html5 api to give nice url
		$locationProvider.html5Mode({
			enabled:true,
			requireBase:false
		});

	});

//--------------------------------------------------------------------

	//	application directives


	//	navigation bar directive
	app.directive('navBar',function(){
		return{
			templateUrl : '/partials/navBar.html',
			restrict : "E",
			requireBase:false
		}
	});