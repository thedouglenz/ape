/*
 * Directives for this application
 */

angular.module('apeAppDirectives', [])
    .directive('apeMenuSelected', function($location) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
		var path = attrs.href.substring(1);
		scope.location = $location;
		scope.$watch('location.path()', function(newPath) {
		    if(path == newPath) {
			element.addClass('menu-selected');
		    } else {
			element.removeClass('menu-selected');
		    }
		});
	    }
	};
    });
