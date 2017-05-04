angular.module('surveyApp').controller('adminSendSurveyCtrl', function($scope, surveyService, templateService, entityService) {
  
  $scope.templates = templateService.getTemplates()
  $scope.check = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate()
    $scope.entities = entityService.getEntities($scope.selectedTemplate.types)
  }
})
