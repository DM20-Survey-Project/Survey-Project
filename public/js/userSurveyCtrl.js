angular.module('surveyApp').controller('userSurveyCtrl', function($scope, surveyService) {

	$scope.getSurveyById = function(){
    $scope.userData = surveyService.getSurveyById();
  }
$scope.getSurveyById();

$scope.getSliderValue = function(x) {

 console.log(x)
}
$scope.submit = function(){




	for (var i = 0; i < $scope.userData.questions.length; i++) {
		if($scope.userData.questions[i].required ){
			if($scope.userData.questions[i].answer){
				$scope.userData.questions[i].incomplete = false;

			} else {
				
				$scope.userData.questions[i].incomplete = true;
			}
		}
	}
	console.log($scope.userData)
}
$scope.getSliderValue();
// console.log($scope.userData)
});
