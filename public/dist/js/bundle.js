'use strict';

angular.module('surveyApp', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.when('', '/');

  $stateProvider
  // .state('user', {
  //   templateUrl: 'views/user.html',
  //
  //   url: '/',
  //   controller: 'userCtrl'
  //
  // })
  // .state('admin', {
  //   templateUrl: 'views/admin.html',
  //
  //   url: '/admin',
  //   controller: 'adminCtrl'
  //
  // })
  .state('home', {
    url: "/",
    templateUrl: "./js/routes/home/homeTmpl.html",
    controller: 'homeCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: './js/routes/login/loginTmpl.html',
    controller: 'loginCtrl'
  }).state('profile', {
    url: '/profile',
    templateUrl: './js/routes/profile/profileTmpl.html',
    controller: 'profileCtrl',
    resolve: {
      user: function user(authService, $state) {
        return authService.getCurrentUser().then(function (response) {
          if (!response.data) $state.go('login');
          return response.data;
        }).catch(function (err) {
          $state.go('login');
        });
      }
    }
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
"use strict";

angular.module("surveyApp").service("authService", function ($http) {

  this.login = function (user) {
    return $http({
      method: 'post',
      url: '/login',
      data: user
    }).then(function (response) {
      return response;
    });
  };

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
});
"use strict";

angular.module("surveyApp").service("userService", function ($http) {

  this.getUsers = function () {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function (response) {
      return response;
    });
  };

  this.getUser = function (id) {
    return $http({
      method: 'GET',
      url: '/user?_id=' + id
    }).then(function (response) {
      return response;
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
"use strict";

angular.module("surveyApp").controller("homeCtrl", function ($scope) {
  $scope.hello = 'Hello World!';
});
"use strict";

angular.module("surveyApp").controller("loginCtrl", function ($scope, authService, $state) {

  $scope.login = function (user) {
    authService.login(user).then(function (response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('profile');
      }
    }).catch(function (err) {
      alert('Unable to login');
    });
  };

  $scope.register = function (user) {
    authService.registerUser(user).then(function (response) {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created');
        $scope.newUser = {};
      }
    }).catch(function (err) {
      alert('Unable to create user');
    });
  };
});
"use strict";

angular.module("surveyApp").controller("profileCtrl", function ($scope, user) {
  $scope.user = user;
});
//# sourceMappingURL=bundle.js.map
