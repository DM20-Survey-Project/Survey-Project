angular.module('surveyApp').controller('adminSendSurveyCtrl', function($scope, surveyService, templateService, entityService) {
  
  $scope.survey = {
    entities: {}
  };
  $scope.templates = templateService.getTemplates()
  $scope.checkTemplate = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate()
    console.log($scope.selectedTemplate);

    $scope.survey.questions = $scope.selectedTemplate.template.questions

    //TODO fix this
    $scope.survey.entities = {}
    for (var i = 0; i < $scope.selectedTemplate.types.length; i++) {
      $scope.survey.entities[$scope.selectedTemplate.types[i]]
      if ($scope.survey.entities[$scope.selectedTemplate.types[i]]) {
        console.log('!!!FOUND ONE!!!');
      } else {
        $scope.survey.entities[$scope.selectedTemplate.types[i]] = undefined;
      }
      
      
    }
    console.log($scope.survey);
    
    $scope.entities = []
    $scope.entities = entityService.getEntities($scope.selectedTemplate.types)
    
  }
  $scope.check = function () {
    $scope.survey.description = $scope.surveyDescription
    console.log($scope.survey);
  }
})
