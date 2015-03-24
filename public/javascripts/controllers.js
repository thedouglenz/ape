
/*
 * apeApp controllers
 */

// TODO: create a controller for the outer portion of the view
//	 so that the nav can show/hide login/logout buttons
//	 depending on if a user is logged in
angular.module('apeAppControllers', [])

    .controller("mainController", function($rootScope, $scope, api) {
	$scope.loggedIn = false;
	$rootScope.$on('$routeChangeStart', function(event, current, previous, rejection) {
	    var currentUser = api.user.get(function(user) {
		var userData = user.toJSON();
	    	if(!user.status == "error") {
		    console.log("No error finding current user");
	    	    $scope.currentUser = user;
	    	    $scope.loggedIn = true;
	    	} else {
		    console.log("Error finding current user");
	    	    $scope.currentUser = {};
	    	    $scope.loggedIn = false;
	    	}
	    });
	});

    })

    .controller("homeController", function($scope, api) {
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

	$scope.deleteProject = function(projectId) {
	    // Prepare the DELETE information
	    var projectDeleteEndpoint = "/api/projects/delete/" + projectId;

	    // Perform the DELETE
	    $http.delete(projectDeleteEndpoint).success(refreshProjects);
	};
    })

    .controller("loginController", function($scope, $http, $location) {
	$scope.userLogin = function() {
	    var username = $scope.loginState.username;
	    var password = $scope.loginState.password;
	    var loginEndpoint = '/users/login';
	    var data = { username: username, password: password };
	    $http.post(loginEndpoint, data).success(function(data, status, headers, config) {
		// console.log(status);
		$scope.loginState = {};
		$location.path('/');
	    }).error(function(data, status, headers, config) {
		// console.log(status);
		$location.path('/login');
		$scope.loginState = {};
		$scope.loginState.error = "Invalid username or password";
	    });
	};
    })

    .controller("logoutController", function($scope, $location, api) {
	api.logout.get(function(data) {
	    $location.path('/');
	});
	$scope.message = "Logging out ...";
    });
