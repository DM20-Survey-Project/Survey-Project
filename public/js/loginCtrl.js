angular.module('surveyApp').controller('loginCtrl', function($scope, authService) {
  $scope.login = function() {
    console.log('Log');
    authService.login()
  }
})
