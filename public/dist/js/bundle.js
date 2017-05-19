'use strict';

angular.module('surveyApp', ['ui.router', 'ngSanitize']).config(function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider.state('user', {
        templateUrl: 'views/user.html',
        url: '/user',
        params: {
            toastMessage: ''
        },
        controller: 'userCtrl',
        resolve: {
            auth: function auth(authService, $state, $stateParams) {
                return authService.checkForAuth().then(function (response) {
                    if (response.status === 200) {
                        return response.data;
                    }
                }).catch(function (err) {
                    console.error('err = ', err);
                    $state.go('login', {
                        successRedirect: 'user'
                    });
                });
            }
        }

    }).state('admin', {
        templateUrl: 'views/admin.html',
        url: '/admin',
        controller: 'adminCtrl'

    }).state('adminSendSurvey', {
        templateUrl: 'views/adminSendSurvey.html',
        url: '/admin/send-survey',
        controller: 'adminSendSurveyCtrl'

    }).state('adminSendSurveyId', {
        templateUrl: 'views/adminSendSurvey.html',
        url: '/admin/send-survey/:id',
        controller: 'adminSendSurveyCtrl'

    }).state('adminResults', {
        templateUrl: 'views/adminResults.html',
        url: '/admin/results',
        controller: 'adminResultsCtrl'

    }).state('adminResultsId', {
        templateUrl: 'views/adminResults.html',
        url: '/admin/results/:id',
        controller: 'adminResultsCtrl'

    }).state('userSurveyPage', {
        templateUrl: 'views/surveyPage.html',
        url: '/user/surveyPage/:surveyId',
        controller: 'userSurveyCtrl',
        resolve: {
            auth: function auth(authService, $state, $stateParams) {
                return authService.checkForAuth().then(function (response) {
                    if (response.status === 200) {
                        return response.data;
                    }
                }).catch(function (err) {
                    // For any error, send them back to admin landing screen.
                    console.error('err = ', err);
                    $state.go('login', {
                        successRedirect: 'user'
                    });
                });
            }
        }
    }).state('login', {
        url: '/',
        templateUrl: 'views/loginPage.html',
        params: {
            toastMessage: '',
            successRedirect: ''
        }
    }).state('templates', {
        url: '/admin/templates',
        templateUrl: "views/templates.html",
        controller: 'templateCtrl'

    });

    // .state('login', {
    // url: '/',
    // templateUrl: 'LocalAuth/views/login.html',
    //     // params : {
    //     //     toastMessage: '',
    //     //     successRedirect: ''
    //     // },
    // controller: 'localLoginCtrl'
    // })
    // .state('signup', {
    // url: '/signup',
    // templateUrl: 'LocalAuth/views/signup.html',
    // controller: 'localSignupCtrl'
    // })

});
'use strict';

angular.module('surveyApp').controller('adminCtrl', function ($scope, surveyService, templateService) {
  $scope.test = 'Hello, I am a test';
  surveyService.getSurveys().then(function (response) {
    console.log(response.data);
    $scope.surveys = response.data;
  });
  templateService.getTemplates().then(function (response) {
    $scope.templates = response.data;
  });
  $scope.test = function () {
    return { 'width': '10%' };
  };
});
'use strict';

angular.module('surveyApp').directive('adminModalDirective', function () {
	return {
		templateUrl: "views/adminModal.html",
		restrict: 'E',
		scope: {
			action: '=',
			subject: '=',
			close: '&',
			deleteEntity: '&',
			addEntity: '&'
		},
		controller: function controller($scope, $state) {
			$scope.entity = {};
			$scope.submitDisabled = true;
			$scope.check = function () {
				if ($scope.entity.name.length < 4) {
					$scope.submitDisabled = true;
				} else {
					$scope.submitDisabled = false;
				}
			};
			console.log($scope.deleteSubject);
			$scope.deleteEntity = $scope.deleteEntity();
			$scope.addEntity = $scope.addEntity();
			if ($scope.subject === 'mentor' || $scope.subject === 'instructor') {
				console.log();
				$scope.location = true;
			} else $scope.submit = function () {
				console.log($scope.entity);
				$scope.entity.type = $scope.subject;
				$scope.addEntity($scope.entity);
				$scope.close();
			};
			$scope.delete = function () {
				$scope.deleteEntity($scope.subject._id);
				$scope.close();
			};
		},
		link: function link(scope, element, attributes) {}
	};
});
'use strict';

angular.module('surveyApp').directive('adminQuestionDirective', function () {
	return {
		templateUrl: "views/adminQuestion.html",
		restrict: 'E',
		scope: {
			question: '='

		},
		controller: function controller($scope, $state) {

			/////////ng-show=textAnswer/false //////////////////////////////////////////////////////////
			if ($scope.question.type == 'text') {
				// $scope.numberAnswer = false;
				$scope.textAnswer = true;
			}
			///////////ng-show=numberAnswer/false ///////////////////////////////////////
			//////////ng-change="numberAssignAnswer()" ng-model="sliderValue"/////////////////////////////////////
			else if ($scope.question.type == 'numeric') {
					$scope.numberAnswer = true;
					$scope.numberString = '';
				}

				/////////ng-show=booleanAnswer/false /////////////////////////
				else if ($scope.question.type == 'boolean') {

						$scope.booleanAnswer = true;
					} else {}
		},
		link: function link(scope, element, attributes) {
			// scope.numberAnswer = true;
		}
	};
});
'use strict';

angular.module('surveyApp').controller('adminResultsCtrl', function ($scope, $state, surveyService, templateService) {
    console.log('test');
    $scope.locations = [];
    surveyService.getSurveys().then(function (response) {

        $scope.surveys = response.data;
        for (var i = 0; i < $scope.surveys.length; i++) {
            console.log($scope.locations.indexOf($scope.surveys[i].entities.cohort.location.city));

            if ($scope.locations.indexOf($scope.surveys[i].entities.cohort.location.city) == -1) {
                $scope.locations.push($scope.surveys[i].entities.cohort.location.city);
            }
        }
        console.log($scope.locations);
    });
    $scope.select = function (id) {
        $scope.selectedSurvey;
        for (var i = 0; i < $scope.surveys.length; i++) {
            if ($scope.surveys[i]._id == id) {
                $scope.selectedSurvey = $scope.surveys[i];
                $scope.hide();
            }
        }
    };

    $scope.locationArr = [];
    $scope.locationObj = {};
    $scope.selectLocation = function (index) {
        if ($scope.locationObj[index]) {
            $scope.locationObj[index] = false;
        } else {
            $scope.locationObj[index] = true;
        }
        if ($scope.locationArr.indexOf($scope.locations[index]) == -1) {
            $scope.locationArr.push($scope.locations[index]);
        } else {
            $scope.locationArr.splice($scope.locationArr.indexOf($scope.locations[index]), 1);
        }
    };
    $scope.locationFilter = function (survey) {

        if ($scope.locationArr.length == 0) {
            return survey;
        } else {
            for (var i = 0; i < $scope.locationArr.length; i++) {

                if (survey.entities.cohort.location.city == $scope.locationArr[i]) {
                    return survey;
                }
            }
        }
    };
    $scope.panelHidden = false;
    $scope.hide = function () {
        if ($scope.panelHidden) {
            $scope.panelHidden = false;
        } else {
            $scope.panelHidden = true;
        }
        console.log($scope.panelHidden);
    };
    $scope.$watch('surveys', function () {
        console.log('running');
        if ($scope.surveys) {
            if ($state.params.id) {
                $scope.select($state.params.id);
            }
        }
    });
});
'use strict';

angular.module('surveyApp').controller('adminSendSurveyCtrl', function ($scope, $state, surveyService, templateService, entityService) {

  $scope.survey = {
    entities: {}
  };
  $scope.submitDisabled = true;
  $scope.modalActive = false;
  $scope.modalType = 'delete';
  $scope.testModalDeleteSubject = {
    name: 'Bingo Jackson',
    id: 4,
    type: 'mentor',
    location: {
      city: 'Salt Lake City',
      state: 'Utah'

    }
  };

  $scope.test2ModalDeleteSubject = {
    name: 'Angular',
    id: 4,
    type: 'topic',
    location: {
      city: 'Salt Lake City',
      state: 'Utah'

    }
  };

  $scope.closeModal = function () {
    $scope.modalActive = false;
  };
  $scope.openModal = function (type, subject) {
    $scope.modalType = type;
    console.log(subject);
    $scope.modalSubject = subject;

    $scope.modalActive = true;
  };

  $scope.deleteEntity = function (id) {
    entityService.deleteEntity(id).then(function () {
      entityService.getEntities($scope.selectedTemplate.types).then(function (response) {
        $scope.entities = response.data;
      });
    });
  };

  $scope.addEntity = function (obj) {
    console.log(obj);
    entityService.addEntity(obj).then(function () {
      entityService.getEntities($scope.selectedTemplate.types).then(function (response) {
        $scope.entities = response.data;
      });
    });
  };
  templateService.getTemplates().then(function (response) {
    console.log(response.data);
    $scope.templates = response.data;
  });

  $scope.checkTemplate = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate();
    $scope.survey.templateId = $scope.selectedTemplate.template._id;
    $scope.survey.questions = $scope.selectedTemplate.template.questions;
    $scope.survey.title = $scope.selectedTemplate.template.title;

    //TODO fix this
    $scope.survey.entities = {};
    for (var i = 0; i < $scope.selectedTemplate.types.length; i++) {
      $scope.survey.entities[$scope.selectedTemplate.types[i]];
      if ($scope.survey.entities[$scope.selectedTemplate.types[i]]) {
        console.log('!!!FOUND ONE!!!');
      } else {
        $scope.survey.entities[$scope.selectedTemplate.types[i]] = undefined;
      }
    }

    $scope.entities = [];
    entityService.getEntities($scope.selectedTemplate.types).then(function (response) {
      $scope.entities = response.data;
    });
    $scope.checkCompleted();
  };

  $scope.check = function () {
    $scope.survey.description = $scope.surveyDescription;

    $scope.checkCompleted();
    console.log($scope.survey);
  };

  $scope.submitSurvey = function () {
    $scope.survey.results = [];
    $scope.survey.usersSentTo = [];
    $scope.survey.usersTaken = [];
    $scope.survey.cohortSentTo = $scope.survey.entities.cohort.dmCohortId;
    $scope.survey.title = $scope.replaceTitle($scope.survey.title, $scope.survey.entities);
    surveyService.sendSurvey($scope.survey).then(function () {
      $state.go('admin');
    });
    console.log($scope.survey);
  };

  $scope.checkCompleted = function () {
    var incompleteVars = [];
    for (var key in $scope.survey.entities) {
      if ($scope.survey.entities.hasOwnProperty(key)) {
        if (!$scope.survey.entities[key]) {
          incompleteVars.push(key + ' not filled');
        }
      }
    }
    if (incompleteVars.length > 0) {
      $scope.submitDisabled = true;
      $scope.submitText = "Fill out all variables";
    } else {
      $scope.submitDisabled = false;
      $scope.submitText = "Send Survey to " + $scope.survey.entities.cohort.name;
    }
  };
  $scope.replaceTitle = function replaceTitle(title, entities) {

    var titleArr = title.split(' ');
    for (var key in entities) {
      if (entities.hasOwnProperty(key)) {
        if (entities[key]) {
          for (var i = 0; i < titleArr.length; i++) {
            if (titleArr[i].indexOf(key) != -1) {
              titleArr.splice(i, 1, entities[key].name);
            }
          }
        }
      }
    }
    return titleArr.join(' ');
  };
});
// angular.module('surveyApp').controller('templateCtrl', function($scope,  $state, $stateParams,surveyService, templateService, entityService){
//
// 	$scope.checkTemplate = function () {
// 		$scope.selectedTemplate = templateService.getSelectedTemplate()
//
// 		$scope.survey.questions = $scope.selectedTemplate.template.questions
// 		$scope.survey.title = $scope.selectedTemplate.template.title
//
// 		//TODO fix this
// 		$scope.survey.entities = {}
// 		for (var i = 0; i < $scope.selectedTemplate.types.length; i++) {
// 			$scope.survey.entities[$scope.selectedTemplate.types[i]]
// 			if ($scope.survey.entities[$scope.selectedTemplate.types[i]]) {
// 				console.log('!!!FOUND ONE!!!');
// 			} else {
// 				$scope.survey.entities[$scope.selectedTemplate.types[i]] = undefined;
// 			}
//
//
// 		}
//
// 		$scope.entities = []
// 		$scope.entities = entityService.getEntities($scope.selectedTemplate.types)
// 		$scope.checkCompleted()
//
// 	}
//
// });
"use strict";
'use strict';

angular.module('surveyApp').directive('dropdownDirective', function () {
  return {
    templateUrl: "views/dropdown.html",
    restrict: 'E',
    scope: {
      entities: '=',
      title: '=',
      check: '&',
      checkTemplate: '&',

      survey: '=',
      openModal: '&'

    },
    controller: function controller($scope, $state, templateService, $timeout) {
      $scope.isCohort = false;
      $scope.isTemplate = false;
      $scope.openModal = $scope.openModal();
      if ($scope.title === 'Cohort') {
        $scope.isCohort = true;
      } else if ($scope.title === 'Template') {
        $scope.isTemplate = true;
      }

      $scope.select = function (id) {
        if ($scope.isTemplate) {
          for (var i = 0; i < $scope.entities.length; i++) {
            if ($scope.entities[i]._id == id) {
              $scope.selected = $scope.entities[i];
              templateService.giveSelected($scope.selected);
              $scope.checkTemplate();
            }
          }
        } else {
          for (var i = 0; i < $scope.entities.entities.length; i++) {
            if ($scope.entities.entities[i]._id == id) {
              $scope.selected = $scope.entities.entities[i];
              $scope.survey.entities[$scope.entities.type] = $scope.selected;
              $scope.check();
            }
          }
        }
        $scope.show();
      };
      $scope.show = function () {
        console.log('working');
        if ($scope.shown) {
          $scope.shown = false;
        } else {
          $scope.shown = true;
        }
      };
      function pullStateParams() {
        if ($scope.entities) {
          if ($scope.isTemplate) {
            if ($state.params.id) {
              $scope.select($state.params.id);
              $scope.show();
            }
          }
        } else {}
      }
      $scope.$watch('entities', function () {
        pullStateParams();
      });
    },
    link: function link(scope, element, attributes) {}
  };
});
'use strict';

angular.module('surveyApp').service('entityService', function ($http) {
    this.getEntities = function (data) {
        var entityPackage = {
            types: data
        };
        return $http({
            method: 'POST',
            url: '/api/entities',
            data: entityPackage
        }).then(function (response) {
            console.log(response.data);
            return response;
        });
    };
    this.addEntity = function (data) {

        return $http({
            method: 'POST',
            url: '/api/addentity',
            data: data
        }).then(function (response) {
            console.log(response.data);
            return response;
        });
    };

    this.deleteEntity = function (data) {

        return $http({
            method: 'DELETE',
            url: '/api/entities/' + data
        }).then(function (response) {
            console.log(response.data);
            return response;
        });
    };
});
'use strict';

angular.module('surveyApp').service('surveyService', function ($http) {

    this.sendSurvey = function (data) {
        return $http({
            method: 'POST',
            url: '/api/admin/surveys',
            data: data
        });
    };

    this.getSurveys = function () {
        return $http({
            method: 'GET',
            url: '/api/admin/surveys'
        });
    };
});
'use strict';

angular.module('surveyApp').controller('templateCtrl', function ($scope, surveyService, templateService, entityService, $state) {

  $scope.save = function (data) {
    templateService.updateTemplate($scope.selectedTemplate.template).then(function () {
      $state.go('admin');
    });
  };
  $scope.needCohort = function () {
    if ($scope.selectedTemplate.template.title.indexOf('$$cohort$$') === -1) {
      $scope.submitDisabled = true;
      $scope.submitText = 'Include $$cohort$$';
    } else if ($scope.selectedTemplate.template.questions.length === 0) {
      $scope.submitDisabled = true;
      $scope.submitText = 'Include at least one question';
    } else {
      $scope.submitDisabled = false;
      $scope.submitText = 'Save Template';
    }
  };
  templateService.getTemplates().then(function (v) {
    $scope.templates = v.data;
  });

  $scope.newQuestion = function (type) {
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
    };
    $scope.selectedTemplate.template.questions.push(question);
    $scope.needCohort();
  };
  $scope.removeQuestion = function (index) {
    $scope.selectedTemplate.template.questions.splice(index, 1);
    $scope.needCohort();
  };

  $scope.survey = {
    entities: {}
  };
  $scope.submitDisabled = true;

  $scope.templates = templateService.getTemplates();

  $scope.checkTemplate = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate();
    // console.log(selectedTemplate.template.questions)
    $scope.survey.questions = $scope.selectedTemplate.template.questions;
    $scope.survey.title = $scope.selectedTemplate.template.title;

    //TODO fix this
    $scope.survey.entities = {};
    for (var i = 0; i < $scope.selectedTemplate.types.length; i++) {
      $scope.survey.entities[$scope.selectedTemplate.types[i]];
      if ($scope.survey.entities[$scope.selectedTemplate.types[i]]) {
        console.log('!!!FOUND ONE!!!');
      } else {
        $scope.survey.entities[$scope.selectedTemplate.types[i]] = undefined;
      }
    }

    $scope.entities = [];
    $scope.entities = entityService.getEntities($scope.selectedTemplate.types);
    $scope.checkCompleted();
    $scope.needCohort();
  };

  $scope.check = function () {
    $scope.survey.description = $scope.surveyDescription;

    $scope.checkCompleted();
    console.log($scope.survey);
  };

  $scope.submitSurvey = function () {
    $scope.survey.title = $scope.replaceTitle($scope.survey.title, $scope.survey.entities);
    console.log($scope.survey);
  };

  $scope.checkCompleted = function () {
    var incompleteVars = [];
    for (var key in $scope.survey.entities) {
      if ($scope.survey.entities.hasOwnProperty(key)) {
        if (!$scope.survey.entities[key]) {
          incompleteVars.push(key + ' not filled');
        }
      }
    }
  };
  $scope.replaceTitle = function replaceTitle(title, entities) {

    var titleArr = title.split(' ');
    for (var key in entities) {
      if (entities.hasOwnProperty(key)) {
        if (entities[key]) {
          for (var i = 0; i < titleArr.length; i++) {
            if (titleArr[i].indexOf(key) != -1) {
              titleArr.splice(i, 1, entities[key].name);
            }
          }
        }
      }
    }
    return titleArr.join(' ');
  };
  $scope.newTemplate = function () {
    $scope.selectedTemplate = {};
    $scope.selectedTemplate.template = {
      title: '$$cohort$$',
      questions: []
    };
    $scope.needCohort();
  };
});
'use strict';

angular.module('surveyApp').directive('templateDirective', function () {
	return {
		templateUrl: "views/templateDirective.html",
		restrict: 'E',
		scope: {
			question: '=',
			removeQuestion: '&',
			index: '='
		},
		controller: function controller($scope, $state) {

			$scope.removeQuestion = $scope.removeQuestion();
			$scope.requiredToggle = function () {
				if ($scope.question.required) {
					$scope.question.required = false;
				} else {
					$scope.question.required = true;
				}
			};
			/////////ng-show=textAnswer/false //////////////////////////////////////////////////////////
			if ($scope.question.type == 'text') {
				// $scope.numberAnswer = false;
				$scope.textAnswer = true;
			}
			///////////ng-show=numberAnswer/false ///////////////////////////////////////
			//////////ng-change="numberAssignAnswer()" ng-model="sliderValue"/////////////////////////////////////
			else if ($scope.question.type == 'numeric') {
					$scope.numberAnswer = true;
					$scope.numberString = '';
				}

				/////////ng-show=booleanAnswer/false /////////////////////////
				else if ($scope.question.type == 'boolean') {

						$scope.booleanAnswer = true;
					} else {}
		},
		link: function link(scope, element, attributes) {
			// scope.numberAnswer = true;
		}
	};
});
'use strict';

angular.module('surveyApp').directive('templateSelectorDirective', function () {
  return {
    templateUrl: "views/templateSelector.html",
    restrict: 'E',
    scope: {
      entities: '=',
      title: '=',
      check: '&',
      checkTemplate: '&',
      newTemplate: '&',
      survey: '=',
      openModal: '&'

    },
    controller: function controller($scope, $state, templateService, $timeout) {
      $scope.isCohort = false;
      $scope.isTemplate = false;
      $scope.openModal = $scope.openModal();
      if ($scope.title === 'Cohort') {
        $scope.isCohort = true;
      } else if ($scope.title === 'Template') {
        $scope.isTemplate = true;
      }

      $scope.addNew = function () {
        $scope.newTemplate();
        $scope.show();
      };
      $scope.select = function (id) {
        if ($scope.isTemplate) {
          for (var i = 0; i < $scope.entities.length; i++) {
            if ($scope.entities[i]._id == id) {
              $scope.selected = $scope.entities[i];
              templateService.giveSelected($scope.selected);
              $scope.checkTemplate();
            }
          }
        } else {
          for (var i = 0; i < $scope.entities.entities.length; i++) {
            if ($scope.entities.entities[i]._id == id) {
              $scope.selected = $scope.entities.entities[i];
              $scope.survey.entities[$scope.entities.type] = $scope.selected;
              $scope.check();
            }
          }
        }
        $scope.show();
      };
      $scope.show = function () {
        console.log('working');
        if ($scope.shown) {
          $scope.shown = false;
        } else {
          $scope.shown = true;
        }
      };
      function pullStateParams() {
        if ($scope.entities) {
          if ($scope.isTemplate) {
            if ($state.params.id) {
              $scope.select($state.params.id);
              $scope.show();
            }
          }
        } else {}
      }
      $scope.$watch('entities', function () {
        pullStateParams();
      });
    },
    link: function link(scope, element, attributes) {}
  };
});
'use strict';

angular.module('surveyApp').service('templateService', function ($http) {

    this.getTemplates = function () {
        return $http({
            method: 'GET',
            url: '/api/admin/templates'
        });
    };
    this.deleteTemplate = function (id) {
        return $http({
            method: 'DELETE',
            url: '/api/admin/templates/' + id
        });
    };
    this.updateTemplate = function (data) {
        console.log(data);
        return $http({
            method: 'POST',
            url: '/api/admin/templates',
            data: data
        });
    };
});
'use strict';

angular.module('surveyApp').controller('userCtrl', function ($scope, $state, $stateParams, auth, authService, userService, $location, $anchorScroll) {

    $scope.name = auth.first_name + ' ' + auth.last_name;
    $scope.isMentor = false;
    $(document).ready(function () {
        if ($stateParams.toastMessage) Materialize.toast($stateParams.toastMessage, 4000);
        for (var i = 0; i < auth.roles.length; i++) {
            if (auth.roles[i].role === 'mentor') {
                $scope.isMentor = true;
            }
        }
    });

    $scope.gotoTop = function () {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('top'); // top of body

        $anchorScroll();
    };

    $scope.untakenSurveys = [];
    $scope.loadUntakenSurveys = function () {
        userService.getUntaken(auth._id).then(function (response) {
            if (!response.data.hasOwnProperty('message')) {
                response.data.forEach(function (e) {
                    $scope.untakenSurveys.push(e);
                });
            }
            if ($scope.untakenSurveys.length === 0) {
                $scope.noSurveys = true;
            }
            console.log($scope.untakenSurveys);
            $scope.surveys = {
                column1: [],
                column2: []
            };
            for (var i = 0; i < $scope.untakenSurveys.length; i++) {
                // console.log($scope.untakenSurveys)
                if (i % 2 === 0) {
                    $scope.surveys.column1.push($scope.untakenSurveys[i]);
                    continue;
                } else {
                    $scope.surveys.column2.push($scope.untakenSurveys[i]);
                    continue;
                    // console.log($scope.untakenSurveys[i])
                }

                return $scope.surveys;
            }

            // console.log($scope.surveys);
        });
    };

    $scope.gotoTop();
    $scope.loadUntakenSurveys();

    $scope.logout = function () {
        console.log('working');
        authService.logout().then(function (response) {
            if (response.status === 200) {
                $state.go('login');
            }
        });
    };

    // $scope.getUser = function(){
    //   $scope.surveys = userService.getUser();
    // }
    // $scope.getUser();
    // console.log($scope.surveysColumn1)
    // $scope.getUntaken = function(studentId){
    //   $scope.userData = userService.getUntaken('590cf0a10bc4105a51c14dd6');
    //   if($scope.userData.surveysA.length == 0 && $scope.userData.surveysB.length == 0) {
    //       $scope.noSurveys = true;
    //   }
    // }
    // $scope.getUntaken();
    // console.log('test')
});
'use strict';

angular.module('surveyApp').directive('userQuestionDirective', function () {
	return {
		templateUrl: "views/userQuestion.html",
		restrict: 'E',
		scope: {
			question: '='

		},
		controller: function controller($scope, $state) {

			//////////////booleanAnswer ng-click"answer && answerno"//////////////////////////////
			$scope.answer = function (question) {
				question.answer = 'true';console.log("answer: ", question);
			};
			$scope.answerno = function (question) {
				question.answer = 'false';console.log("no answer: ", question);
			};

			/////////////textAnswer ng-change="textAssignAnswer" ng-model="textValue"/////////////////////////////////
			$scope.textAssignAnswer = function () {
				$scope.question.answer = $scope.textValue;
			};

			/////////ng-show=textAnswer/false //////////////////////////////////////////////////////////
			if ($scope.question.type == 'text') {
				// $scope.numberAnswer = false;
				$scope.textAnswer = true;
			}
			///////////ng-show=numberAnswer/false ///////////////////////////////////////
			//////////ng-change="numberAssignAnswer()" ng-model="sliderValue"/////////////////////////////////////
			else if ($scope.question.type == 'numeric') {
					$scope.numberAnswer = true;
					$scope.numberString = '';

					$scope.numberAssignAnswer = function () {
						$scope.question.answer = $scope.sliderValue;
					};
				}

				/////////ng-show=booleanAnswer/false /////////////////////////
				else if ($scope.question.type == 'boolean') {

						$scope.booleanAnswer = true;
					} else {}
		},
		link: function link(scope, element, attributes) {
			// scope.numberAnswer = true;
		}
	};
});
'use strict';

angular.module('surveyApp').controller('userSurveyCtrl', function ($scope, $state, authService, auth, $stateParams, userService) {

	console.log('$stateParams.surveyId = ', $stateParams.surveyId);

	$scope.readSurvey = function () {
		userService.getSurvey($stateParams.surveyId).then(function (response) {
			console.log('in takeSurveyCtrl');
			console.log('in readSurvey');
			console.log('response', response);
			$scope.survey = response.data;
		}).catch(function (err) {
			console.error('err = ', err);
			$state.go('user');
		});
	};
	$scope.readSurvey();

	// $scope.processForm = function() {
	//            $scope.newResults.user = auth._id;
	//            $scope.newResults.survey = $stateParams.surveyId;
	//            $scope.newResults.topic = $scope.topicId;
	//            console.log('newResults = ', $scope.newResults);
	//            takeSurveyService.writeSurveyResults($scope.newResults)
	//            .then(function(response) {
	//                console.log('in takeSurveyCtrl');
	//                console.log('in processForm');
	//                console.log('response', response);
	//                if (response.status === 200) {
	//                    $state.go('user', {
	//                        toastMessage: 'Survey Successfully Submitted'
	//                    });
	//                }
	//             })
	//            .catch(function(err) {
	//            // For any error, send them back to admin login screen.
	//                console.error('err = ', err);
	//                $scope.errorMsg = 'Error Submitting Survey';
	//            });
	//        }


	$scope.getSliderValue = function (x) {};
	$scope.submit = function () {
		var incompleteQuestions = [];

		for (var i = 0; i < $scope.survey.questions.length; i++) {
			if ($scope.survey.questions[i].required) {
				if ($scope.survey.questions[i].answer) {
					$scope.survey.questions[i].incomplete = false;
				} else {

					$scope.survey.questions[i].incomplete = true;
					incompleteQuestions.push($scope.survey.questions[i]);
				}
			}
		}
		if (incompleteQuestions.length > 0) {
			$scope.unansweredQuestions = true;
		} else {
			var results = {

				surveyId: $scope.survey._id,
				userId: auth._id,
				results: $scope.survey.questions

			};
			console.log('this is scope.survey', $scope.survey);
			console.log('results', results);

			userService.writeSurveyResults(results).then(function () {
				$state.go('user');
			});
		}
		console.log($scope.survey.questions);
	};
	$scope.logout = function () {
		console.log('working');
		authService.logout().then(function (response) {
			if (response.status === 200) {
				$state.go('login');
			}
		});
	};
	$scope.getSliderValue();
	console.log($scope.survey);

	// authService.

});
"use strict";

angular.module("surveyApp").service("authService", function ($http) {

    this.login = function (userData) {
        console.log('userData = ', userData);

        return $http({
            method: 'POST',
            url: '/api/login',
            data: userData
        });
    };

    this.logout = function () {
        return $http({
            method: 'GET',
            url: '/api/logout'
        });
    };

    this.checkForAuth = function () {
        return $http({
            method: 'GET',
            url: '/api/current_user'
        });
    };

    this.checkForAdminAuth = function () {
        return $http({
            method: 'GET',
            url: '/api/current_admin_user'
        });
    };
});
"use strict";

angular.module("surveyApp").service("userService", function ($http) {

    this.getSurvey = function (surveyId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/' + surveyId
        });
    };

    this.writeSurveyResults = function (data) {
        return $http({
            method: 'POST',
            url: '/api/surveys/results',
            data: data
        });
    };

    this.getUntaken = function (studentId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/untaken/' + studentId
        });
    };
});
"use strict";

angular.module("surveyApp").controller("navCtrl", function ($scope, authService, $state) {
  $scope.logout = function () {
    authService.logout().then(function (response) {
      $state.go('login');
    });
  };
});
'use strict';

angular.module('surveyApp').directive('navDir', function () {
  return {
    restrict: 'EA',
    templateUrl: './js/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  };
});
//# sourceMappingURL=bundle.js.map
