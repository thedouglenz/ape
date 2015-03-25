/* 
 * Where the angular excitement begins ...
 */

angular.module("apeApp", ['ngRoute', 'apeAppControllers', 'apeAppAPIProvider', 'apeAppDirectives'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '../partials/home.html',
                controller: 'homeController'
            })
            .when('/projects', {
                templateUrl: '../partials/projects.html',
                controller: 'projectsController'
            })
	    .when('/login', {
		templateUrl: '../partials/login.html',
		controller: 'loginController'
	    })
	    .when('/logout', {
		templateUrl: '../partials/logout.html',
		controller: 'logoutController'
	    })
	    .when('/register', {
		templateUrl: '../partials/register.html',
		controller: 'registerController'
	    });
        }]);
