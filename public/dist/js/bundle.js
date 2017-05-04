'use strict';

angular.module('surveyApp', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {

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
    controller: 'userSurveyCtrl'
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
  $scope.entities = entityService.getEntities();
  $scope.templates = templateService.getTemplates();
  console.log($scope.templates);
});
'use strict';

angular.module('surveyApp').directive('dropdownDirective', function () {
  return {
    templateUrl: "views/dropdown.html",
    restrict: 'E',
    scope: {
      entities: '=',
      title: '='

    },
    controller: function controller($scope, $state) {
      $scope.isCohort = false;
      $scope.isTemplate = false;

      console.log($scope.title);
      if ($scope.title === 'Cohort') {
        $scope.isCohort = true;
      } else if ($scope.title === 'Template') {
        $scope.isTemplate = true;
      }

      $scope.select = function (id) {
        if ($scope.isTemplate) {
          console.log('template');
          for (var i = 0; i < $scope.entities.length; i++) {
            if ($scope.entities[i].id == id) {
              console.log('found one');
              $scope.selected = $scope.entities[i];
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
    this.getEntities = function () {
        return entities;
    };
    var entities = {
        mentors: {
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
        },
        cohorts: {
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
        }
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
            type: 'text'

        }, {
            questionTitle: 'uhwoueofhoeir?',
            type: 'boolean'

        }, {
            questionTitle: 'How good is micahel memoryasdfring?',
            type: 'number'

        }, {
            questionTitle: 'How good is micahel memory at mentoring?',
            type: 'boolean'

        }, {
            questionTitle: 'How good is micahel memory at mentoring?',
            type: 'text'

        }, {
            questionTitle: 'How good is micahel memory at mentoring?',
            type: 'number'

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
    this.parseTitle = function (title) {
        console.log(title);
    };
    var recentTemplates = [{
        title: '$$cohort$$ - Unit 1 Survey',
        id: 1
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
        title: '$$name$$ - $$cohort$$ - iOS Mentor',
        id: 5
    }, {
        title: '$$name$$ - $$cohort$$ - iOS Instructor',
        id: 6
    }, {
        title: '$$name$$ - $$cohort$$ - UI/UX Mentor asdfas dfasdglkfasld asdljfh askljasdflkj',
        id: 7
    }];
});
'use strict';

angular.module('surveyApp').controller('userCtrl', function ($scope, userService) {
  $scope.test = 'Hello, I am a test';

  $scope.getUser = function () {
    $scope.userData = userService.getUser();
    if ($scope.userData.surveysA.length == 0 && $scope.userData.surveysB.length == 0) {
      $scope.noSurveys = true;
    }
  };
  $scope.getUser();
  console.log('test');
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
			if ($scope.question.type == 'text') {
				$scope.textAnswer = true;
			} else if ($scope.question.type == 'number') {
				$scope.numberAnswer = true;
			} else if ($scope.question.type == 'boolean') {
				$scope.booleanAnswer = true;
			} else {}
		},
		link: function link(scope, element, attributes) {}
	};
});
'use strict';

angular.module('surveyApp').service('userService', function () {
    this.getUser = function () {
        return {
            surveysA: recentSurveys,
            surveysB: recentSurveysB
        };
    };
    var recentSurveys = [{

        title: 'DM20-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor sajdhjhasdkfhklj kjl jkasdhfklj a skljdf jkla kdjajsdh fklj asdf klasdf kjasdf kasdf kjsdf kaskjf kljasdf lkhasdjf klj asdfgakl rgfiuqohrou asdlkjl ;iasdh '
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
        description: 'lorem'
    }, {
        title: 'Michael Memory - DM20 - Survey',
        description: 'lorem'
    }, {
        title: 'DM20 - Jquery Survey',
        description: 'lorem'

    }];

    var recentSurveysB = [{
        classTitle: 'DM21',
        title: 'DM20-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor'
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

angular.module('surveyApp').controller('userSurveyCtrl', function ($scope, surveyService) {

  $scope.getSurveyById = function () {
    $scope.userData = surveyService.getSurveyById();
  };
  $scope.getSurveyById();

  $scope.getSliderValue = function (x) {

    console.log(x);
  };
  $scope.getSliderValue();
  console.log($scope.userData);
});
//# sourceMappingURL=bundle.js.map
