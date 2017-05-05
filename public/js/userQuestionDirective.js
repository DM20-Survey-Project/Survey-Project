angular.module('surveyApp').directive('userQuestionDirective', function(){
	return {
	    templateUrl: "views/userQuestion.html",
	    restrict: 'E',
	    scope: {
	      question: '=',

	    },
	    controller: function( $scope, $state ) {
				$scope.test = function(question) {
					question.test = true; console.log("tru11111e",question)
				}
				$scope.testno = function(question) {
					question.test = false; console.log("quest",question)
				}


	      if ($scope.question.type == 'text'){
					$scope.textAnswer = true;
				}
				else if ($scope.question.type == 'number'){
					$scope.numberAnswer = true;
					$scope.numberString = ''
					// '<input type="range" min="1" max="10" value="1" name="slider" ng-change="getSliderValue(sliderValue);" ng-model="sliderValue" >'
				}
			 	else if ($scope.question.type == 'boolean'){
					$scope.booleanAnswer = true;
				} else {}
	    },
	    link: function(scope, element, attributes ) {
	    }
	  }
})
