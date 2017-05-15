angular.module('surveyApp')
.directive('templateDirective', function() {
  return {
	    templateUrl: "views/templateDirective.html",
	    restrict: 'E',
	    scope: {
	      question: '=',
        removeQuestion: '&',
        index: '='
	    },
	    controller: function( $scope, $state ) {


        $scope.removeQuestion = $scope.removeQuestion()
/////////ng-show=textAnswer/false //////////////////////////////////////////////////////////
	      if ($scope.question.type == 'text'){
					// $scope.numberAnswer = false;
					$scope.textAnswer = true;
				}
///////////ng-show=numberAnswer/false ///////////////////////////////////////
//////////ng-change="numberAssignAnswer()" ng-model="sliderValue"/////////////////////////////////////
				else if ($scope.question.type == 'numeric'){
					$scope.numberAnswer = true;
					$scope.numberString = '';

				}

	/////////ng-show=booleanAnswer/false /////////////////////////
			 	else if ($scope.question.type == 'boolean'){

					$scope.booleanAnswer = true;
				} else {}
	    },
	    link: function(scope, element, attributes ) {
				// scope.numberAnswer = true;
	    }
	  }
})
