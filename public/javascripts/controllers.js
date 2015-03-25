
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
	    console.log(api.user);
	    var currentUser = api.user.get(function(user) {
		var userData = user.toJSON();
	    	if(userData.id) {
	    	    $scope.currentUser = user;
	    	    $scope.loggedIn = true;
	    	} else {
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

    .controller("registerController", function($scope, $http, $location) {
	var passMatch = false;
	$scope.registerUser = function() {
	    if(passMatch) {
		var registerEndpoint = "/users/register";
		var data = {
		    email: $scope.registerState.email,
		    username: $scope.registerState.username,
		    password: $scope.registerState.password
		};
		$http.post(registerEndpoint, data).success(function(data, status, headers, config) {
		    $scope.registerState = {};
		    $location.path('/login');
		}).error(function(data, status, error, config) {
		    $scope.registerState = {};
		    $scope.registerState.error = "There was an error. An account may already exist with this username or email address.";
		});
	    }
	};

	$scope.validatePasswords = function() {
	    var a = $scope.registerState.password;
	    var b = $scope.registerState.reEnterPassword;
	    if(a && b) {
		if(a !== b) {
	    	    passMatch = false;
	    	    $scope.registerState.error = "Passwords do not match!";
	    	} else {
	    	    passMatch = true;
	    	    $scope.registerState.error = "";
	    	}
	    }
	};
    })

    .controller("logoutController", function($scope, $location, api) {
	api.logout.get(function(data) {
	    $location.path('/');
	});
	$scope.message = "Logging out ...";
    });
