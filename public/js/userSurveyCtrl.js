angular.module('surveyApp').controller('userSurveyCtrl', function($scope, $state, $stateParams, userService) {


	    console.log('$stateParams.surveyId = ', $stateParams.surveyId);

			$scope.readSurvey = function() {
       userService.getSurvey($stateParams.surveyId)
       .then(function( response ) {
            console.log('in takeSurveyCtrl');
            console.log('in readSurvey')
            console.log('response', response);
            $scope.survey = response.data;
            $scope.initializeResults();
            $scope.readTopic();
        })
        .catch(function(err) {
            console.error('err = ', err);
            $state.go('student');
        })
    }

$scope.getSliderValue = function(x) {

 console.log(x)
}
$scope.submit = function(){
var incompleteQuestions = [];




	for (var i = 0; i < $scope.userData.questions.length; i++) {
		if($scope.userData.questions[i].required ){
			if($scope.userData.questions[i].answer){
				$scope.userData.questions[i].incomplete = false;

			} else {

				$scope.userData.questions[i].incomplete = true;
				incompleteQuestions.push($scope.userData.questions[i])
			}
		}
	}
	if(incompleteQuestions.length > 0 ){
		$scope.unansweredQuestions = true;

	} else {
		surveyService.writeSurveyResults($scope.userData.questions).then(function(){
			$state.go('user')
		});

	}
	console.log($scope.userData.questions)

}
$scope.getSliderValue();
// console.log($scope.userData)
});
