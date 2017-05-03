angular.module('surveyApp').controller('userCtrl', function($scope, userService) {
  $scope.test = 'Hello, I am a test'


  $scope.userData = userService.getUser();
  console.log('test')
})
