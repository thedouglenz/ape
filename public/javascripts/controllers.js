
/*
 * apeApp controllers
 */
angular.module('apeAppControllers', [])

    .controller("homeController", function($scope) {
        $scope.time = Date();
        var updateTime = function() {
            $scope.time = Date();
        }
        setInterval(function() {
            $scope.$apply(updateTime);
        }, 1000);
        updateTime();
    })

    .controller("projectsController", function($scope, $http, api) {
	var refreshProjects = function() {
	    api.projects.query(function(data) {
                $scope.projects = data;
            });
	}; refreshProjects();

	$scope.addProject = function() {
	    // Prepare the POST information
	    var projectPostEndpoint = "/api/projects";
	    var data = {
		title : $scope.project_state.title,
		description: $scope.project_state.description
	    };

	    // Clear the project_state object (and thus the form fields)
	    $scope.project_state = {};

	    // Perform the POST
	    $http.post(projectPostEndpoint, data).success(refreshProjects);
	};
    });
