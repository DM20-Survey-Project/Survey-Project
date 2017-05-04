'use strict';

angular.module('surveyApp', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.when('', '/');

  $stateProvider.state('user', {
    templateUrl: 'views/user.html',
    url: '/',
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
});
'use strict';

angular.module('surveyApp').directive('dropdownDirective', function () {
  return {
    templateUrl: "views/dropdown.html",
    restrict: 'E',
    scope: {
      entities: '='

    },
    controller: function controller($scope, $state) {
      $scope.isCohort = false;
      if ($scope.entities.type === 'Cohort') {
        $scope.isCohort = true;
      }
      $scope.select = function (id) {
        for (var i = 0; i < $scope.entities.entities.length; i++) {
          if ($scope.entities.entities[i].id == id) {
            $scope.selected = $scope.entities.entities[i];
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
});
'use strict';

angular.module('surveyApp').service('templateService', function () {
    this.getRecentTemplates = function () {
        return recentTemplates;
    };
    var recentTemplates = [{
        title: '$$cohort$$ - Unit 1 Survey'
    }, {
        title: '$$cohort$$ - Unit 5 Survey'
    }, {
        title: '$$cohort$$ - Jquery Survey'
    }, {
        title: '$$cohort$$ - Weekly'
    }, {
        title: '$$name$$ - $$cohort$$ - iOS Mentor'
    }, {
        title: '$$name$$ - $$cohort$$ - iOS Instructor'
    }, {
        title: '$$name$$ - $$cohort$$ - UI/UX Mentor asdfas dfasdglkfasld asdljfh askljasdflkj'
    }];
});
'use strict';

angular.module('surveyApp').controller('userCtrl', function ($scope, userService) {
  $scope.test = 'Hello, I am a test';

  $scope.userData = userService.getUser();
  console.log('test');
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
        classTitle: 'DM21',
        title: '-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor sajdhjhasdkfhklj kjl jkasdhfklj a skljdf jkla kdjajsdh fklj asdf klasdf kjasdf kasdf kjsdf kaskjf kljasdf lkhasdjf klj asdfgakl rgfiuqohrou asdlkjl ;iasdh '
    }, {
        title: ' - Week 2 Survey',
        description: 'lorem'
    }, {
        title: ' - Week 3 Survey',
        description: 'lorem'
    }, {
        title: ' - Week 4 Survey',
        description: 'lorem'
    }, {
        title: ' - Week 5 Survey',
        description: 'lorem'
    }, {
        title: 'Michael Memory -  - Survey',
        description: 'lorem'
    }, {
        title: ' - Jquery Survey',
        description: 'lorem'

    }];

    var recentSurveysB = [{
        classTitle: 'DM21',
        title: '-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor'
    }, {
        title: ' - Week 2 Survey',
        description: 'lorem'
    }, {
        title: ' - Week 3 Survey',
        description: 'lorem'
    }, {
        title: ' - Week 4 Survey',
        description: 'lorem'
    }, {
        title: ' - Week 5 Survey',
        description: 'lorem lasihdfo hhasdfoih oph asdfjhasldkjhfjkhaskldjhfklj hkljasdhf   kj hadjf haskjdh kjasd fkjhakldjf hklajsd klj hkajsdf khasj kdhfklj asdfklj askljdf hjakljasdkljh fklj asdfhjk'
    }, {
        title: 'Michael Memory -  - Survey',
        description: 'lorem'
    }, {
        title: ' - Jquery Survey',
        description: 'lorem'

    }];
});
//# sourceMappingURL=bundle.js.map
