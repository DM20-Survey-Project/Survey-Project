angular.module('surveyApp', ['ui.router'])

  .config( function ($urlRouterProvider, $stateProvider ){

$urlRouterProvider.when('', '/');

  $stateProvider
    .state('user', {
      templateUrl: 'views/user.html',
      url: '/',
      controller: 'userCtrl'

    })
    .state('admin', {
      templateUrl: 'views/admin.html',
      url: '/admin',
      controller: 'adminCtrl'

    })
    




})
