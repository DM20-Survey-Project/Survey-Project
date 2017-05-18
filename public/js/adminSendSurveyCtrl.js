
angular.module('surveyApp').controller('adminSendSurveyCtrl', function($scope, $state, surveyService, templateService, entityService) {


  $scope.survey = {
    entities: {}
  };
  $scope.submitDisabled = true
  $scope.modalActive = false
  $scope.modalType = 'delete'
  $scope.testModalDeleteSubject = {
     name: 'Bingo Jackson',
          id: 4,
          type: 'mentor',
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
  }

  $scope.test2ModalDeleteSubject = {
     name: 'Angular',
          id: 4,
          type: 'topic',
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
  }

  $scope.closeModal = function () {
    $scope.modalActive = false;
  }
  $scope.openModal = function (type, subject) {
    $scope.modalType = type
    console.log(subject);
      $scope.modalSubject = subject

    $scope.modalActive = true;
  }

  $scope.deleteEntity = function (id) {
    entityService.deleteEntity(id).then(function () {
      entityService.getEntities($scope.selectedTemplate.types).then(function (response) {
        $scope.entities = response.data
      })
    })

  }

  $scope.addEntity = function (obj) {
    console.log(obj);
    entityService.addEntity(obj).then(function () {
      entityService.getEntities($scope.selectedTemplate.types).then(function (response) {
        $scope.entities = response.data
      })
    })
  }
  templateService.getTemplates().then(function (response) {
    console.log(response.data);
    $scope.templates = response.data
  })

  $scope.checkTemplate = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate()
    $scope.survey.templateId = $scope.selectedTemplate.template._id
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
    entityService.getEntities($scope.selectedTemplate.types).then(function (response) {
      $scope.entities = response.data
    })
    $scope.checkCompleted()

  }

  $scope.check = function () {
    $scope.survey.description = $scope.surveyDescription

    $scope.checkCompleted()
    console.log($scope.survey);
  }

  $scope.submitSurvey = function () {
    $scope.survey.results = [];
    $scope.survey.usersSentTo = []
    $scope.survey.usersTaken = []
    $scope.survey.cohortSentTo = $scope.survey.entities.cohort.dmCohortId
    $scope.survey.title = $scope.replaceTitle($scope.survey.title, $scope.survey.entities)
    surveyService.sendSurvey($scope.survey).then(function () {
      $state.go('admin')
    })
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
    if (incompleteVars.length > 0) {
      $scope.submitDisabled = true;
      $scope.submitText = "Fill out all variables"
    } else {
      $scope.submitDisabled = false;
      $scope.submitText = "Send Survey to " + $scope.survey.entities.cohort.name
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
})
