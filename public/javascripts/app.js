/* 
 * Where the angular excitement begins ...
 */

var app = angular.module("apeapp", []);

/*
 * app controllers TODO: Move to a different file someday
 */

app.controller("homeController", function($scope) {
    $scope.time = Date();
    var updateTime = function() {
        $scope.time = Date();
    }
    setInterval(function() {
        $scope.$apply(updateTime);
    }, 1000);
    updateTime();
});
