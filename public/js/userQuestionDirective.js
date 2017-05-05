angular.module('surveyApp').directive('userQuestionDirective', function(){
	return {
	    templateUrl: "views/userQuestion.html",
	    restrict: 'E',
	    scope: {
	      question: '=',

	    },
	    controller: function( $scope, $state ) {
				$scope.answer = function(question) {
					question.answer = true; console.log("tru11111e",question)
				}
				$scope.answerno = function(question) {
					question.answer = false; console.log("quest",question)
				}
				$scope.numberAssignAnswer = function(){
					$scope.question.answer = $scope.sliderValue
				}
				$scope.textAssignAnswer = function(){
					$scope.question.answer = $scope.textValue
				}

	      if ($scope.question.type == 'text'){
					$scope.textAnswer = true;
				}
				else if ($scope.question.type == 'number'){
					$scope.numberAnswer = true;
					$scope.numberString = '';

				}
			 	else if ($scope.question.type == 'boolean'){
					$scope.booleanAnswer = true;
				} else {}
	    },
	    link: function(scope, element, attributes ) {
	    }
	  }
})
