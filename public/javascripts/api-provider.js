angular.module('apeAppAPIProvider', ['ngResource'])
    .provider('api', function() {
        var apiUrlPrefix = "/api";
	var usersPrefix = "/users";

        this.$get = function apiFactory($resource) {
            var api = {};
            api.posts = $resource(apiUrlPrefix + "/posts");

	    api.user = $resource(usersPrefix + "/me");
	    api.logout = $resource(usersPrefix + "/logout");

            return api;
        };
    });
