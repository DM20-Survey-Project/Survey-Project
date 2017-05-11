angular.module('surveyApp').directive('adminModalDirective', function(){
	return {
	    templateUrl: "views/adminModal.html",
	    restrict: 'E',
	    scope: {
            action: '=',
            deleteSubject: '=',
            close: '&',
	    },
	    controller: function( $scope, $state ) {
            console.log($scope.deleteSubject);
            $scope.delete = function () {
                $scope.close();
            }
	    },
	    link: function(scope, element, attributes ) {

	    }
	  }
})
