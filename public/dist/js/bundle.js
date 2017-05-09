'use strict';

angular.module('surveyApp', ['ui.router', 'ngSanitize']).config(function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider.state('user', {
        templateUrl: 'views/user.html',
        url: '/user',
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

    }).state('userSurveyPage', {
        templateUrl: 'views/surveyPage.html',
        url: '/user/surveyPage',
        controller: 'userSurveyCtrl',
        params: {
            surveyId: ''
        },
        resolve: {
            auth: function auth(authService, $state, $stateParams) {
                return authService.checkForAuth().then(function (response) {
                    if (response.status === 200) {
                        return response.data;
                    }
                }).catch(function (err) {
                    // For any error, send them back to admin login screen.
                    console.error('err = ', err);
                    $state.go('login', {
                        successRedirect: 'user'
                    });
                });
            }
        }
    }).state('login', {
        url: '/',
        templateUrl: 'LocalAuth/views/login.html',
        // params : {
        //     toastMessage: '',
        //     successRedirect: ''
        // },
        controller: 'localLoginCtrl'
    }).state('signup', {
        url: '/signup',
        templateUrl: 'LocalAuth/views/signup.html',
        controller: 'localSignupCtrl'
    });
});
'use strict';

angular.module('surveyApp').controller('adminCtrl', function ($scope, surveyService, templateService) {
  $scope.test = 'Hello, I am a test';
  $scope.surveys = surveyService.getRecentSurveys();
  $scope.templates = templateService.getRecentTemplates();
  $scope.test = function () {
    return { 'width': '10%' };
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

angular.module('surveyApp').controller('adminSendSurveyCtrl', function ($scope, surveyService, templateService, entityService) {

  $scope.survey = {
    entities: {}
  };
  $scope.submitDisabled = true;

  $scope.templates = templateService.getTemplates();

  $scope.checkTemplate = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate();

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
    $scope.survey.title = $scope.replaceTitle($scope.survey.title, $scope.survey.entities);
    $scope.checkCompleted();
  };
  $scope.check = function () {
    $scope.survey.description = $scope.surveyDescription;
    $scope.survey.title = $scope.replaceTitle($scope.survey.title, $scope.survey.entities);
    $scope.checkCompleted();
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
      surveyEntities: '='

    },
    controller: function controller($scope, $state, templateService) {
      $scope.isCohort = false;
      $scope.isTemplate = false;

      if ($scope.title === 'Cohort') {
        $scope.isCohort = true;
      } else if ($scope.title === 'Template') {
        $scope.isTemplate = true;
      }

      $scope.select = function (id) {
        if ($scope.isTemplate) {
          for (var i = 0; i < $scope.entities.length; i++) {
            if ($scope.entities[i].id == id) {
              $scope.selected = $scope.entities[i];
              templateService.giveSelected($scope.selected);
              $scope.checkTemplate();
            }
          }
        } else {
          for (var i = 0; i < $scope.entities.entities.length; i++) {
            if ($scope.entities.entities[i].id == id) {
              $scope.selected = $scope.entities.entities[i];
              $scope.surveyEntities[$scope.entities.type] = $scope.selected;
              $scope.check();
            }
          }
        }
        $scope.show();
      };
      $scope.show = function () {
        if ($scope.shown) {
          $scope.shown = false;
        } else {
          $scope.shown = true;
        }
      };
    },
    link: function link(scope, element, attributes) {}
  };
});
'use strict';

angular.module('surveyApp').service('entityService', function () {
    this.getEntities = function (requestedEntites) {
        var response = [];
        for (var i = 0; i < requestedEntites.length; i++) {
            switch (requestedEntites[i]) {
                case 'mentor':
                    response.push(mentors);
                    break;
                case 'cohort':
                    response.push(cohorts);
                    break;

                case 'topic':
                    response.push(topics);
                    break;

                default:
                    break;
            }
        }
        return response;
    };

    var mentors = {
        type: 'mentor',
        entities: [{
            name: 'Michael Memory',
            id: 1,
            location: {
                city: 'Provo',
                state: 'Utah'

            }

        }, {
            name: 'Max Rodewald',
            id: 2,
            location: {
                city: 'Provo',
                state: 'Utah'

            }

        }, {
            name: 'Brett Gardiner',
            id: 3,
            location: {
                city: 'Provo',
                state: 'Utah'

            }

        }, {
            name: 'Bingo Jackson',
            id: 4,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }

        }, {
            name: 'HeeHaw Horseman',
            id: 5,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }

        }, {
            name: 'Gunsmoke',
            id: 6,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }

        }, {
            name: 'Michael Memory',
            id: 7,
            location: {
                city: 'Provo',
                state: 'Utah'

            }

        }, {
            name: 'Max Rodewald',
            id: 8,
            location: {
                city: 'Provo',
                state: 'Utah'

            }

        }, {
            name: 'Brett Gardiner',
            id: 9,
            location: {
                city: 'Provo',
                state: 'Utah'

            }

        }, {
            name: 'Bingo Jackson',
            id: 10,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }

        }, {
            name: 'HeeHaw Horseman',
            id: 11,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }

        }, {
            name: 'Gunsmoke',
            id: 12,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }

        }]
    };

    var cohorts = {
        type: "cohort",
        entities: [{
            name: 'DM20',
            id: 1,
            location: {
                city: 'Provo',
                state: 'Utah'

            }
        }, {
            name: 'DM19',
            id: 2,
            location: {
                city: 'Provo',
                state: 'Utah'

            }
        }, {
            name: 'DM18',
            id: 3,
            location: {
                city: 'Provo',
                state: 'Utah'

            }
        }, {
            name: 'iOS20',
            id: 4,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }
        }, {
            name: 'iOS19',
            id: 5,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }
        }, {
            name: 'iOS18',
            id: 6,
            location: {
                city: 'Salt Lake City',
                state: 'Utah'

            }
        }]
    };

    var topics = {
        type: "topic",
        entities: [{
            name: 'Jquery',
            id: 1

        }, {
            name: 'Angular',
            id: 2

        }, {
            name: 'HTML/CSS',
            id: 3

        }, {
            name: 'React',
            id: 4

        }, {
            name: 'Mentoring',
            id: 5

        }]
    };
});
'use strict';

angular.module('surveyApp').service('surveyService', function () {

  this.getRecentSurveys = function () {
    return recentSurveys;
  };
  this.getSurveyById = function () {
    return survey;
  };
  var recentSurveys = [{
    title: 'DM20 - Week 1 Survey',
    percentComplete: 50
  }, {
    title: 'DM20 - Week 2 Survey',
    percentComplete: 80
  }, {
    title: 'DM20 - Week 3 Survey',
    percentComplete: 11
  }, {
    title: 'DM20 - Week 4 Survey',
    percentComplete: 100
  }, {
    title: 'DM20 - Week 5 Survey',
    percentComplete: 40
  }, {
    title: 'Michael Memory - DM20 - Survey',
    percentComplete: 33
  }, {
    title: 'DM20 - Jquery Survey',
    percentComplete: 0
  }];
  var survey = {
    title: 'DM20-WHATEVER',
    description: 'LOREMMMMMM',
    questions: [{
      questionTitle: 'How good is micahel memory at mentoring?',
      type: 'text',
      required: true

    }, {
      questionTitle: 'uhwoueofhoeir?',
      type: 'boolean',
      required: true

    }, {
      questionTitle: 'How good is micahel memoryasdfring?',
      type: 'number',
      required: true,
      min: {
        value: 1,
        tag: 'Very Poor'
      },
      max: {
        value: 20,
        tag: 'Very Good'
      }

    }, {
      questionTitle: 'How good is micahel memory at mentoring?',
      type: 'boolean',
      required: true

    }, {
      questionTitle: 'How good is micahel memory at mentoring?',
      type: 'text',
      required: true

    }, {
      questionTitle: 'How good is micahel memory at mentoring?',
      type: 'number',
      required: true

    }]
  };
});
'use strict';

angular.module('surveyApp').service('templateService', function () {
    this.getRecentTemplates = function () {
        return recentTemplates;
    };
    this.getTemplates = function () {
        return recentTemplates;
    };
    var currentTemplate = {};
    this.getSelectedTemplate = function () {
        return currentTemplate;
    };
    this.giveSelected = function (template) {
        currentTemplate.template = template;
        currentTemplate.types = this.parseTitle(template.title);
    };
    this.parseTitle = function (title) {
        var parsing = false;
        var parseStrArr = [];

        var titleArr = title.split('');
        var parsedEntities = [];
        for (var i = 0; i < titleArr.length; i++) {

            if (parsing) {

                if (titleArr[i] !== '$') {
                    parseStrArr.push(titleArr[i]);
                } else {
                    parsing = false;
                    parsedEntities.push(parseStrArr.join(''));
                    parseStrArr = [];
                    i += 2;
                }
            } else {
                if (titleArr[i - 1] == '$') {
                    parsing = true;
                }
            }
        }
        return parsedEntities;
    };
    var recentTemplates = [{
        title: '$$cohort$$ - $$topic$$ - Unit 1 Survey',
        id: 1,
        questions: [{
            questionText: 'How good is micahel memory at mentoring?',
            type: 'text',
            required: true

        }, {
            questionText: 'uhwoueofhoeir?',
            type: 'boolean',
            required: true

        }, {
            questionText: 'How good is micahel memoryasdfring?',
            type: 'numeric',
            required: true,
            min: {
                value: 1,
                tag: 'Very Poor'
            },
            max: {
                value: 20,
                tag: 'Very Good'
            }

        }, {
            questionText: 'How good is micahel memory at mentoring?',
            type: 'boolean',
            required: true

        }, {
            questionText: 'How good is micahel memory at mentoring?',
            type: 'text',
            required: true

        }, {
            questionText: 'How good is micahel memory at mentoring?',
            type: 'numeric',
            required: true,
            min: {
                value: 1,
                tag: 'Very Bad'
            },
            max: {
                value: 5,
                tag: 'Very Great'
            }

        }]
    }, {
        title: '$$cohort$$ - Unit 5 Survey',
        id: 2
    }, {
        title: '$$cohort$$ - Jquery Survey',
        id: 3
    }, {
        title: '$$cohort$$ - Weekly',
        id: 4
    }, {
        title: '$$mentor$$ - $$cohort$$ - iOS Mentor',
        id: 5
    }, {
        title: '$$mentor$$ - $$cohort$$ - iOS Instructor',
        id: 6
    }, {
        title: '$$mentor$$ - $$cohort$$ - UI/UX Mentor asdfas dfasdglkfasld asdljfh askljasdflkj',
        id: 7
    }];
});
'use strict';

angular.module('surveyApp').controller('userCtrl', function ($scope, $state, $stateParams, auth, authService, userService) {

      $scope.loadUntakenSurveys = function () {
            userService.getUntaken(auth._id).then(function (response) {
                  console.log('in studentCtrl');
                  console.log('in loadUntakenSurveys');
                  console.log('response', response);
                  $scope.untakenSurveys = response.data;
            });
      };

      $scope.loadUntakenSurveys();

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
					console.log($scope.sliderValue);
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

angular.module('surveyApp').service('userService', function () {

  // this.getUser = function () {
  //     return {
  // 			surveysA: recentSurveys,
  //       surveysB: recentSurveysB
  // 		}
  // }
  // var recentSurveys = [
  //     {
  //
  //         title: 'DM20-Brett Rheiner',
  //       description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor sajdhjhasdkfhklj kjl jkasdhfklj a skljdf jkla kdjajsdh fklj asdf klasdf kjasdf kasdf kjsdf kaskjf kljasdf lkhasdjf klj asdfgakl rgfiuqohrou asdlkjl ;iasdh '
  //     },
  //     {
  //         title: 'DM20 - Week 2 Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Week 3 Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Week 4 Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Week 5 Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'Michael Memory - DM20 - Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Jquery Survey',
  // 				  description: 'lorem'
  //
  //     },
  // ]
  //
  // var recentSurveysB = [
  //     {
  //         classTitle: 'DM21',
  //         title: 'DM20-Brett Rheiner',
  //       description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor'
  //     },
  //     {
  //         title: 'DM20 - Week 2 Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Week 3 Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Week 4 Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Week 5 Survey',
  // 				  description: 'lorem lasihdfo hhasdfoih oph asdfjhasldkjhfjkhaskldjhfklj hkljasdhf   kj hadjf haskjdh kjasd fkjhakldjf hklajsd klj hkajsdf khasj kdhfklj asdfklj askljdf hjakljasdkljh fklj asdfhjk'
  //     },
  //     {
  //         title: 'Michael Memory - DM20 - Survey',
  // 				  description: 'lorem'
  //     },
  //     {
  //         title: 'DM20 - Jquery Survey',
  // 				  description: 'lorem'
  //
  //     }
  // ]

});
'use strict';

angular.module('surveyApp').controller('userSurveyCtrl', function ($scope, auth, $stateParams, $state, userService) {

    console.log('in takeSurveyCtrl');
    console.log('$stateParams.surveyId = ', $stateParams.surveyId);

    $scope.results = {};

    $scope.response = {};

    $scope.notAnswered = [];

    $scope.borderOnYes = [], $scope.borderOnNo = [];

    $scope.readTopic = function () {
        console.log($scope.survey.topic);
        $scope.topic = $scope.survey.topic;
        // userService.getTopic($scope.survey.topic)
        // .then(function( response ) {
        //     console.log('in takeSurveyCtrl');
        //     console.log('in getTopic');
        //     console.log('response', response);
        //     if (response.status === 200) {
        //         $scope.topic = response.data[0].name;
        //     }
        //  })
        // .catch(function(err) {
        // // For any error, send them back to admin login screen.
        //     console.error('err = ', err);
        // });
    };

    $scope.initializeResults = function () {

        $scope.results.answers = [];

        console.log('$scope.survey.questions', $scope.survey.questions);
        $scope.survey.questions.forEach(function (question, index, array) {
            $scope.results.answers[index] = {
                type: question.type
            };
            $scope.notAnswered[index] = false;
            $scope.borderOnYes[index] = false;
            $scope.borderOnNo[index] = false;
        });
        console.log('$scope.results.answers = ', $scope.results.answers);
        console.log('$scope.notAnswered = ', $scope.notAnswered);
    };

    $scope.readSurvey = function () {
        userService.getSurvey($stateParams.surveyId).then(function (response) {
            console.log('in takeSurveyCtrl');
            console.log('in readSurvey');
            console.log('response', response);
            $scope.survey = response.data;
            $scope.initializeResults();
            $scope.readTopic();
        }).catch(function (err) {
            console.error('err = ', err);
            $state.go('user');
        });
    };

    $scope.checkForRequired = function () {

        var allRequiredFieldsAnswered = true;

        for (var i = 0; i < $scope.survey.questions.length; i++) {
            if ($scope.survey.questions[i].required) {
                switch ($scope.results.answers[i].type) {
                    case 'numeric':
                        if (!$scope.results.answers[i].numericAnswer) {
                            console.log('numeric not answered');
                            $scope.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        } else {
                            $scope.notAnswered[i] = false;
                        }
                        break;
                    case 'boolean':
                        if (!$scope.results.answers[i].booleanAnswer) {
                            /* Note--boolean answers are saved in directive as string "true" or "false". They are converted to boolean in convertValues() below */
                            console.log('boolean not answered');
                            $scope.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        } else {
                            $scope.notAnswered[i] = false;
                        }
                        break;
                    case 'text':
                        if (!$scope.results.answers[i].textAnswer) {
                            console.log('text not answered');
                            $scope.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        } else {
                            $scope.notAnswered[i] = false;
                        }
                        break;
                }
            }
        }

        return allRequiredFieldsAnswered;
    };

    $scope.convertValues = function () {

        var newObj = {};

        newObj = JSON.parse(JSON.stringify($scope.results));

        for (var i = 0; i < newObj.answers.length; i++) {

            switch (newObj.answers[i].type) {
                case 'numeric':
                    if (newObj.answers[i].numericAnswer) {
                        newObj.answers[i].numericAnswer = Number(newObj.answers[i].numericAnswer); // convert to numeric answer
                    }
                    break;
                case 'boolean':
                    if (newObj.answers[i].booleanAnswer) {
                        newObj.answers[i].booleanAnswer = newObj.answers[i].booleanAnswer === "true"; // convert to boolean answer
                    }
                    break;
            }
        }

        return newObj;
    };

    $scope.processForm = function () {
        var allRequiredAnswered = $scope.checkForRequired();
        if (allRequiredAnswered) {
            $scope.newResults = $scope.convertValues();
            $scope.newResults.user = auth._id;
            $scope.newResults.survey = $stateParams.surveyId;
            console.log('newResults = ', $scope.newResults);
            userService.writeSurveyResults($scope.newResults).then(function (response) {
                console.log('in takeSurveyCtrl');
                console.log('in processForm');
                console.log('response', response);
                if (response.status === 200) {
                    $state.go('student', {
                        toastMessage: 'Survey Successfully Submitted'
                    });
                }
            }).catch(function (err) {
                // For any error, send them back to admin login screen.
                console.error('err = ', err);
                $scope.errorMsg = 'Error Submitting Survey';
            });
        } else {
            $('#validation_modal').openModal();
        }
    };

    $scope.readSurvey();

    // 	$scope.getSurveyById = function(){
    //     $scope.userData = surveyService.getSurveyById();
    //   }
    // $scope.getSurveyById();
    //
    // $scope.getSliderValue = function(x) {
    //
    //  console.log(x)
    // }
    // $scope.submit = function(){
    //
    //
    //
    //
    // 	for (var i = 0; i < $scope.userData.questions.length; i++) {
    // 		if($scope.userData.questions[i].required ){
    // 			if($scope.userData.questions[i].answer){
    // 				$scope.userData.questions[i].incomplete = false;
    //
    // 			} else {
    //
    // 				$scope.userData.questions[i].incomplete = true;
    // 			}
    // 		}
    // 	}
    // 	console.log($scope.userData)
    // }
    // $scope.getSliderValue();
    // // console.log($scope.userData)
});
"use strict";

angular.module("surveyApp").service("authService", function ($http) {
  // 
  // this.login = function(user) {
  //   return $http({
  //     method: 'post',
  //     url: '/api/login',
  //     data: user
  //   }).then(function(response) {
  //     console.log('srevice ', response);
  //     return response;
  //   });
  // };

  this.logout = function () {
    return $http({
      method: 'get',
      url: '/logout'
    }).then(function (response) {
      return response;
    });
  };

  this.getCurrentUser = function () {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function (response) {
      return response;
    });
  };

  this.registerUser = function (user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function (response) {
      return response;
    });
  };

  this.editUser = function (id, user) {
    return $http({
      method: 'PUT',
      url: "/user/" + id,
      data: user
    }).then(function (response) {
      return response;
    });
  };

  this.checkForAuth = function () {
    return $http({
      method: 'GET',
      url: '/api/current_user'
    });
  };
});
"use strict";

angular.module("surveyApp").service("userService", function ($http) {

    this.getUntaken = function (studentId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/untaken/' + studentId
        });
    };

    this.getSurvey = function (surveyId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/' + surveyId
        });
    };

    this.getTopic = function (topicId) {
        return $http({
            method: 'GET',
            url: '/api/topics/' + topicId
        });
    };

    this.writeSurveyResults = function (data) {
        return $http({
            method: 'POST',
            url: '/api/surveys/results',
            data: data
        });
    };

    // this.getUsers = function() {
    //   return $http({
    //     method: 'GET',
    //     url: '/user'
    //   }).then(function(response) {
    //     return response;
    //   });
    // };
    //
    // this.getUser = function(id) {
    //   return $http({
    //     method: 'GET',
    //     url: '/user?_id=' + id
    //   }).then(function(response) {
    //     return response;
    //   });
    // };
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
