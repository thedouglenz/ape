
/*
 * apeApp controllers
 */
angular.module('apeAppControllers', [])

    .controller("homeController", function($scope, api) {
        $scope.time = Date();
        var updateTime = function() {
            $scope.time = Date();
        }
        setInterval(function() {
            $scope.$apply(updateTime);
        }, 1000);
        updateTime();

	// Get the current user
	var currentUser = api.user.get(function(user) {
	    if(user) {
		$scope.currentUser = user;
	    } else {
		$scope.currentUser = {};
	    }
	});
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

	$scope.deleteProject = function(projectId) {
	    // Prepare the DELETE information
	    var projectDeleteEndpoint = "/api/projects/delete/" + projectId;

	    // Perform the DELETE
	    $http.delete(projectDeleteEndpoint).success(refreshProjects);
	};
    })

    .controller("loginController", function($scope, $http) {
	$scope.userLogin = function() {
	    var username = $scope.loginState.username;
	    var password = $scope.loginState.password;
	    var loginEndpoint = '/users/login';
	    var data = { username: username, password: password };
	    $http.post(loginEndpoint, data);
	};
    })

    .controller("logoutController", function($scope, api) {
	api.logout.get(function(data) {
	    console.log("Successfully logged out");
	});
	$scope.message = "Logging out ...";
    });
