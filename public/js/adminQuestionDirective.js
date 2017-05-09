angular.module('surveyApp').directive('adminQuestionDirective', function(){
	return {
	    templateUrl: "views/adminQuestion.html",
	    restrict: 'E',
	    scope: {
	      question: '=',

	    },
	    controller: function( $scope, $state ) {

	

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

					console.log($scope.sliderValue)
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
