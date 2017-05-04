angular.module('surveyApp').controller('userCtrl', function($scope, userService) {
  $scope.test = 'Hello, I am a test'



  $scope.getUser = function(){
    $scope.userData = userService.getUser();
    if($scope.userData.surveysA.length == 0 && $scope.userData.surveysB.length == 0) {
        $scope.noSurveys = true;

    }
  }
  $scope.getUser();
  console.log('test')
})
