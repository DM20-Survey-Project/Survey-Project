angular.module('surveyApp').directive('userQuestionDirective', function(){
	return {
	    templateUrl: "views/userQuestion.html",
	    restrict: 'E',
	    scope: {
	      question: '=',

	    },
	    controller: function( $scope, $state ) {

	//////////////booleanAnswer ng-click"answer && answerno"//////////////////////////////
				$scope.answer = function(question) {
					question.answer = 'true'; console.log("answer: ",question)
				}
				$scope.answerno = function(question) {
					question.answer = 'false'; console.log("no answer: ",question)
				}

/////////////textAnswer ng-change="textAssignAnswer" ng-model="textValue"/////////////////////////////////
				$scope.textAssignAnswer = function(){
					$scope.question.answer = $scope.textValue
				}



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

					$scope.numberAssignAnswer = function(){
						$scope.question.answer = $scope.sliderValue
					}
					
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
