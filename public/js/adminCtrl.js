angular.module('surveyApp').controller('adminCtrl', function($scope, surveyService, templateService) {
  $scope.test = 'Hello, I am a test'
  $scope.surveys = surveyService.getRecentSurveys()
  $scope.templates = templateService.getRecentTemplates()
  $scope.test = function () {
    return {'width': '10%'}
  }
})
