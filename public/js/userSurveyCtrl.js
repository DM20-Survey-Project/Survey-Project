angular.module('surveyApp').controller('userSurveyCtrl', function($scope, surveyService) {

	$scope.getSurveyById = function(){
    $scope.userData = surveyService.getSurveyById();
  }
$scope.getSurveyById();


console.log($scope.userData)
});
