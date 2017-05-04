angular.module('surveyApp', ['ui.router', 'ngSanitize'])

  .config( function ($urlRouterProvider, $stateProvider ){

$urlRouterProvider.when('', '/');

  $stateProvider
    .state('user', {
      templateUrl: 'views/user.html',
      url: '/user',
      controller: 'userCtrl'

    })
    .state('admin', {
      templateUrl: 'views/admin.html',
      url: '/admin',
      controller: 'adminCtrl'

    })

    .state('adminSendSurvey', {
      templateUrl: 'views/adminSendSurvey.html',
      url: '/admin/send-survey',
      controller: 'adminSendSurveyCtrl'

    })
    .state('adminSendSurveyId', {
      templateUrl: 'views/adminSendSurvey.html',
      url: '/admin/send-survey/:id',
      controller: 'adminSendSurveyCtrl'

    })
    .state('userSurveyPage', {
      templateUrl: 'views/surveyPage.html',
      url: '/user/surveyPage',
      controller: 'userSurveyCtrl'
    })





})
