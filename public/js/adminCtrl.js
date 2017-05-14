angular.module('surveyApp').controller('adminCtrl', function($scope, surveyService, templateService) {
  $scope.test = 'Hello, I am a test'
  surveyService.getSurveys().then(function (response) {
    console.log(response.data);
    $scope.surveys = response.data
  })
  templateService.getTemplates().then(function (response) {
    $scope.templates = response.data
  })
  $scope.test = function () {
    return {'width': '10%'}
  }
})
