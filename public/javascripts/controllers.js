
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

    .controller("postsController", function($scope, $http, api) {
	var refreshPosts = function() {
	    api.posts.query(function(data) {
                $scope.posts = data;
            });
	}; refreshPosts();

	$scope.addPost = function() {
	    // Prepare the POST information
	    var postPostEndpoint = "/api/posts";
	    var data = {
            title : $scope.post_state.title,
            description: $scope.post_state.description
	    };

	    // Clear the post_state object (and thus the form fields)
	    $scope.post_state = {};

	    // Perform the POST
	    $http.post(postPostEndpoint, data).success(refreshPosts);
	};

	$scope.deletePost = function(postId) {
	    // Prepare the DELETE information
	    var postDeleteEndpoint = "/api/posts/delete/" + postId;

	    // Perform the DELETE
	    $http.delete(postDeleteEndpoint).success(refreshPosts);
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
