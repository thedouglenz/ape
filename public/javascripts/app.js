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
            });
        }]);
