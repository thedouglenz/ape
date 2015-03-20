angular.module('apeAppAPIProvider', ['ngResource'])
    .provider('api', function() {
        var urlprefix = "/api";

        this.$get = function apiFactory($resource) {
            var api = {};
            api.projects = $resource(urlprefix + "/projects");

            return api;
        };
    });
