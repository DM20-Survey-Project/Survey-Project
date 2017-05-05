angular.module('surveyApp', ['ui.router'])

  .config( function ($urlRouterProvider, $stateProvider ){

$urlRouterProvider.when('', '/');

  $stateProvider
    .state('user', {
      templateUrl: 'views/user.html',
      url: '/user',
      controller: 'userCtrl',
      resolve: {
                    auth: function(authService, $state, $stateParams) {
                        return authService.checkForAuth()
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                            })
                            .catch(function(err) {
                                console.error('err = ', err);
                                $state.go('login', {
                                    successRedirect: 'user'
                                });
                            });
                    }
                }

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

    .state('login', {
		url: '/',
		templateUrl: 'LocalAuth/views/login.html',
        params : {
            toastMessage: '',
            successRedirect: ''
        },
		controller: 'localLoginCtrl'
    })
    .state('signup', {
		url: '/signup',
		templateUrl: 'LocalAuth/views/signup.html',
		controller: 'localSignupCtrl'
    })




})
