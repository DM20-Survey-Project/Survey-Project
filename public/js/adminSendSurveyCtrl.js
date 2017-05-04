angular.module('surveyApp').controller('adminSendSurveyCtrl', function($scope, surveyService, templateService, entityService) {
  $scope.entities = entityService.getEntities()
  $scope.templates = templateService.getTemplates()
  console.log($scope.templates);
})
