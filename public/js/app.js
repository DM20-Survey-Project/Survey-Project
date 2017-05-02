angular.module('surveyApp', ['ui.router'])

  .config( function ($urlRouterProvider, $stateProvider ){

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
        user: function(authService, $state) {
          return authService.getCurrentUser().then(function(response) {
            if (!response.data)
              $state.go('login');
            return response.data;
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    });




})
