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

angular.module('surveyApp').controller('adminCtrl', function ($scope) {
  $scope.test = 'Hello, I am a test';
});
'use strict';

angular.module('surveyApp').controller('userCtrl', function ($scope) {
  $scope.test = 'Hello, I am a test';
});
//# sourceMappingURL=bundle.js.map
