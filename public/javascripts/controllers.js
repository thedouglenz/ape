
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

    .controller("projectsController", function($scope, api) {
        api.projects.query(function(data) {
            $scope.projects = data;
        });
    });
