angular.module('surveyApp').controller('templateCtrl', function($scope, surveyService, templateService, entityService, $state) {


  $scope.save = function(data){
    templateService.updateTemplate($scope.selectedTemplate.template).then(function(){
      $state.go('admin')
    })


  }
  $scope.needCohort = function(){
    if($scope.selectedTemplate.template.title.indexOf('$$cohort$$') === -1){
      $scope.submitDisabled = true;
      $scope.submitText = 'Include $$cohort$$';
    } else if ($scope.selectedTemplate.template.questions.length === 0) {
      $scope.submitDisabled = true;
      $scope.submitText = 'Include at least one question';
    } else {
      $scope.submitDisabled = false;
      $scope.submitText = 'Save Template';
    }
  }
  templateService.getTemplates().then(function(v){
    $scope.templates =  v.data
  })

  $scope.newQuestion = function(type){
    var question = {
      questionText: '',
      type: type,
      required: false,
      min: {
      value: 1,
      tag: 'Very Poor'
      },
      max: {
      value: 10,
      tag: 'Very Good'
      }
    }
    $scope.selectedTemplate.template.questions.push(question)
    $scope.needCohort()

  }
  $scope.removeQuestion = function(index){
      $scope.selectedTemplate.template.questions.splice(index, 1)
      $scope.needCohort()
  }




  $scope.survey = {
    entities: {}
  };
  $scope.submitDisabled = true

  $scope.templates = templateService.getTemplates()

  $scope.checkTemplate = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate()
// console.log(selectedTemplate.template.questions)
    $scope.survey.questions = $scope.selectedTemplate.template.questions
    $scope.survey.title = $scope.selectedTemplate.template.title

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

    $scope.entities = []
    $scope.entities = entityService.getEntities($scope.selectedTemplate.types)
    $scope.checkCompleted()
    $scope.needCohort();

  }

  $scope.check = function () {
    $scope.survey.description = $scope.surveyDescription

    $scope.checkCompleted()
    console.log($scope.survey);
  }

  $scope.submitSurvey = function () {
    $scope.survey.title = $scope.replaceTitle($scope.survey.title, $scope.survey.entities)
    console.log($scope.survey);
  }

  $scope.checkCompleted = function () {
    var incompleteVars = []
    for (var key in $scope.survey.entities) {
      if ($scope.survey.entities.hasOwnProperty(key)) {
        if (!$scope.survey.entities[key]) {
          incompleteVars.push(key + ' not filled')
        }

      }
    }

  }
  $scope.replaceTitle = function replaceTitle(title, entities) {

    var titleArr = title.split(' ')
    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
           if (entities[key]) {
              for (var i = 0; i < titleArr.length; i++) {
                if (titleArr[i].indexOf(key) != -1) {
                    titleArr.splice(i,1,entities[key].name)
                }

            }
           }
        }
    }
    return titleArr.join(' ')

  }
  $scope.newTemplate = function () {
    $scope.selectedTemplate = {

    }
    $scope.selectedTemplate.template = {
      title: '$$cohort$$',
      questions: []
    }
    $scope.needCohort();

  }

})
