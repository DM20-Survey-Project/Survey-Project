angular.module('surveyApp').controller('userSurveyCtrl', function($scope, $state, $stateParams, userService) {

	console.log('$stateParams.surveyId = ', $stateParams.surveyId);

			$scope.readSurvey = function() {
       userService.getSurvey($stateParams.surveyId)
       .then(function( response ) {
            console.log('in takeSurveyCtrl');
            console.log('in readSurvey')
            console.log('response', response);
            $scope.survey = response.data;
        })
        .catch(function(err) {
            console.error('err = ', err);
            $state.go('user');
        })
    }
		$scope.readSurvey();

$scope.getSliderValue = function(x) {

 
}
$scope.submit = function(){
var incompleteQuestions = [];




	for (var i = 0; i < $scope.survey.questions.length; i++) {
		if($scope.survey.questions[i].required ){
			if($scope.survey.questions[i].answer){
				$scope.survey.questions[i].incomplete = false;

			} else {

				$scope.survey.questions[i].incomplete = true;
				incompleteQuestions.push($scope.survey.questions[i])
			}
		}
	}
	if(incompleteQuestions.length > 0 ){
		$scope.unansweredQuestions = true;

	} else {
		userService.writeSurveyResults($scope.survey.questions).then(function(){
			$state.go('user')
		});

	}
	console.log($scope.survey.questions)

}
$scope.getSliderValue();
// console.log($scope.survey)
});
