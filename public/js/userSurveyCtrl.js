angular.module('surveyApp').controller('userSurveyCtrl', function($scope, surveyService) {

	$scope.getSurveyById = function(){
    $scope.userData = surveyService.getSurveyById();
  }
$scope.getSurveyById();

$scope.getSliderValue = function(x) {

 console.log(x)
}
$scope.submit = function(){
	console.log($scope.userData)
}
$scope.getSliderValue();
// console.log($scope.userData)
});
