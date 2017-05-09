'use strict';

liveangular.module('surveyApp', ['ui.router', 'ngSanitize']).config(function ($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.when('', '/');

  $stateProvider.state('user', {
    templateUrl: 'views/user.html',
    url: '/user',
    controller: 'userCtrl'
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
    }
    // resolve: {
    //       // auth: function(authService, $state, $stateParams) {
    //       //     return authService.checkForAuth()
    //       //     .then(function( response ) {
    //       //         if (response.status === 200) {
    //       //             return response.data;
    //       //         }
    //       //     })
    //       //     .catch(function(err) {
    //       //         // For any error, send them back to admin login screen.
    //       //         console.error('err = ', err);
    //       //         $state.go('login', {
    //       //             successRedirect: 'user'
    //       //         });
    //       //     });
    //       // }
    //   }
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

angular.module('surveyApp').controller('adminSendSurveyCtrl', function ($scope, surveyService, templateService, entityService) {

  $scope.templates = templateService.getTemplates();
  $scope.check = function () {
    $scope.selectedTemplate = templateService.getSelectedTemplate();
    console.log($scope.selectedTemplate);
    $scope.entities = entityService.getEntities($scope.selectedTemplate.types);
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
      check: '&'

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
              $scope.check();
            }
          }
        } else {
          for (var i = 0; i < $scope.entities.entities.length; i++) {
            if ($scope.entities.entities[i].id == id) {
              $scope.selected = $scope.entities.entities[i];
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

                default:
                    break;
            }
        }
        return response;
    };

    var mentors = {
        type: 'Mentor',
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
        type: "Cohort",
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
});
'use strict';

angular.module('surveyApp').service('surveyService', function ($http) {

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
        title: '$$cohort$$ - Unit 1 Survey',
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

angular.module('surveyApp').controller('userCtrl', function ($scope, $state, $stateParams, userService) {

  // $scope.loadUntakenSurveys = function() {
  //         userService.getUntaken(auth._id)
  //         .then(function( response ) {
  //             console.log('in studentCtrl');
  //             console.log('in loadUntakenSurveys')
  //             console.log('response', response);
  //             $scope.untakenSurveys = response.data;
  //         });
  //     }
  //
  //     $scope.loadUntakenSurveys();

  $scope.getUser = function () {

    $scope.surveys = userService.getUser();
  };
  $scope.getUser();
  console.log($scope.surveysColumn1);
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

    var surveysColumn1 = [{}];
    var surveysColumn2 = [{}];
    this.getUser = function () {
        var surveys = {
            column1: [],
            column2: []
        };
        for (var i = 0; i < recentSurveys.length; i++) {
            if (i % 2 === 0) {

                surveys.column1.push(recentSurveys[i]);
            } else {
                surveys.column2.push(recentSurveys[i]);
            }
        }

        return surveys;
    };

    // this.getUser = function() {
    //   return recentSurveys
    // }
    var recentSurveys = [{

        title: 'DM20-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor sajdhjhasdkfhklj kjl jkasdhfklj a skljdf jkla kdjajsdh fklj asdf klasdf kjasdf kasdf kjsdf kaskjf kljasdf lkhasdjf klj asdfgakl rgfiuqohrou asdlkjl ;iasdh '
    }, {
        title: 'DM20 - Week 2 Survey'

    }, {
        title: 'DM20 - Week 3 Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Week 4 Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Week 5 Survey',
        description: 'lorem'
    }, {
        title: 'Michael Memory - DM20 - Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Jquery Survey',
        description: 'lorem'

    }, {
        classTitle: 'DM21',
        title: 'DM20-MAXXiliion Rheiner'

    }, {
        title: 'DM20 - Week 2 Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Week 3 Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Week 4 Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Week 5 Survey',
        description: 'lorem lasihdfo hhasdfoih oph asdfjhasldkjhfjkhaskldjhfklj hkljasdhf   kj hadjf haskjdh kjasd fkjhakldjf hklajsd klj hkajsdf khasj kdhfklj asdfklj askljdf hjakljasdkljh fklj asdfhjk'
    }, {
        title: 'Michael Memory - DM20 - Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Jquery Survey',
        description: 'lorem'

    }];
});
'use strict';

angular.module('surveyApp').controller('userSurveyCtrl', function ($scope, $state, surveyService) {

	$scope.getSurveyById = function () {
		$scope.userData = surveyService.getSurveyById();
	};

	$scope.getSurveyById();

	$scope.getSliderValue = function (x) {

		console.log(x);
	};
	$scope.submit = function () {
		var incompleteQuestions = [];

		for (var i = 0; i < $scope.userData.questions.length; i++) {
			if ($scope.userData.questions[i].required) {
				if ($scope.userData.questions[i].answer) {
					$scope.userData.questions[i].incomplete = false;
				} else {

					$scope.userData.questions[i].incomplete = true;
					incompleteQuestions.push($scope.userData.questions[i]);
				}
			}
		}
		if (incompleteQuestions.length > 0) {
			$scope.unansweredQuestions = true;
		} else {
			surveyService.writeSurveyResults($scope.userData.questions).then(function () {
				$state.go('user');
			});
		}
		console.log($scope.userData.questions);
	};
	$scope.getSliderValue();
	// console.log($scope.userData)
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
// angular.module("surveyApp").service("userService", function($http) {
//
//
//
//     this.getUntaken = function(studentId) {
//         return $http({
//             method: 'GET',
//             url: '/api/surveys/untaken/' + studentId
//         });
//     }
//
//     this.getSurvey = function(surveyId) {
//         return $http({
//             method: 'GET',
//             url: '/api/surveys/' + surveyId
//         });
//     }
//
//     this.getTopic = function(topicId) {
//     	return $http({
//             method: 'GET',
//             url: '/api/topics/' + topicId
//         });
//      }
//
//      this.writeSurveyResults = function(data) {
//     	return $http({
//             method: 'POST',
//             url: '/api/surveys/results',
//             data: data
//         });
//     }
//
//
//
//     // this.getUsers = function() {
//     //   return $http({
//     //     method: 'GET',
//     //     url: '/user'
//     //   }).then(function(response) {
//     //     return response;
//     //   });
//     // };
//     //
//     // this.getUser = function(id) {
//     //   return $http({
//     //     method: 'GET',
//     //     url: '/user?_id=' + id
//     //   }).then(function(response) {
//     //     return response;
//     //   });
//     // };
// });
"use strict";
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
