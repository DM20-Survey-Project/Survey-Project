angular.module('surveyApp').directive('userQuestionDirective', function(){
	return {
	    templateUrl: "views/userQuestion.html",
	    restrict: 'E',
	    scope: {
	      question: '=',

	    },
	    controller: function( $scope, $state ) {
	      if ($scope.question.type == 'text'){
					$scope.textAnswer = true;
				}
				else if ($scope.question.type == 'number'){
					$scope.numberAnswer = true;
				}
			 	else if ($scope.question.type == 'boolean'){
					$scope.booleanAnswer = true;
				} else {}
	    },
	    link: function(scope, element, attributes ) {
	    }
	  }
})
