angular.module('surveyApp').controller('adminSendSurveyCtrl', function($scope, surveyService, templateService, entityService) {
  
  $scope.templates = templateService.getTemplates()
  $scope.check = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate()
    console.log($scope.selectedTemplate);
    $scope.entities = entityService.getEntities($scope.selectedTemplate.types)
  }
})
