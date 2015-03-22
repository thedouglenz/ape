angular.module('apeAppAPIProvider', ['ngResource'])
    .provider('api', function() {
        var apiUrlPrefix = "/api";
	var usersPrefix = "/users";

        this.$get = function apiFactory($resource) {
            var api = {};
            api.projects = $resource(apiUrlPrefix + "/projects");

	    api.user = $resource(usersPrefix + "/me");
	    api.logout = $resource(usersPrefix + "/logout");

            return api;
        };
    });
