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

angular.module('surveyApp').controller('userCtrl', function ($scope) {
  $scope.test = 'Hello, I am a test';
});
//# sourceMappingURL=bundle.js.map
