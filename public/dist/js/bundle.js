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

angular.module('surveyApp').controller('adminCtrl', function ($scope, surveyService) {
  $scope.test = 'Hello, I am a test';
});
'use strict';

angular.module('surveyApp').service('surveyService', function () {
    this.getRecentSurveys = function () {
        return surveys;
    };
    var surveys = [{
        title: 'DM20 - Week 1 Survey'

    }];
});
'use strict';

angular.module('surveyApp').controller('userCtrl', function ($scope) {
  $scope.test = 'Hello, I am a test';
});
//# sourceMappingURL=bundle.js.map
