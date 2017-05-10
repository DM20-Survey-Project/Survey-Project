angular.module('surveyApp').controller('userSurveyCtrl', function($scope, $state, authService, auth, $stateParams, userService) {


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

		// $scope.processForm = function() {
	  //            $scope.newResults.user = auth._id;
	  //            $scope.newResults.survey = $stateParams.surveyId;
	  //            $scope.newResults.topic = $scope.topicId;
	  //            console.log('newResults = ', $scope.newResults);
	  //            takeSurveyService.writeSurveyResults($scope.newResults)
	  //            .then(function(response) {
	  //                console.log('in takeSurveyCtrl');
	  //                console.log('in processForm');
	  //                console.log('response', response);
	  //                if (response.status === 200) {
	  //                    $state.go('user', {
	  //                        toastMessage: 'Survey Successfully Submitted'
	  //                    });
	  //                }
	  //             })
	  //            .catch(function(err) {
	  //            // For any error, send them back to admin login screen.
	  //                console.error('err = ', err);
	  //                $scope.errorMsg = 'Error Submitting Survey';
	  //            });
	  //        }




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
		var results = {

            surveyId: $scope.survey._id,
						userId: auth._id,
            results: $scope.survey.questions

        }
        console.log('this is scope.survey',$scope.survey)
        console.log('results',results )

        userService.writeSurveyResults(results).then(function(){
            $state.go('user')

		});

	}
	console.log($scope.survey.questions)

}
$scope.logout = function(){
	console.log('working')
	authService.logout()
	 .then(function( response ) {
				if (response.status === 200) {
						$state.go('login');
				}
		});
}
$scope.getSliderValue();
console.log($scope.survey)




// authService.









});
