angular.module('surveyApp', ['ui.router', 'ngSanitize'])

    .config(function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.when('', '/');

        $stateProvider
            .state('user', {
                templateUrl: 'views/user.html',
                url: '/user',
                params: {
                    toastMessage: ''
                },
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

            .state('adminResults', {
                templateUrl: 'views/adminResults.html',
                url: '/admin/results',
                controller: 'adminResultsCtrl'

            })
            .state('adminResultsId', {
                templateUrl: 'views/adminResults.html',
                url: '/admin/results/:id',
                controller: 'adminResultsCtrl'

            })

            .state('userSurveyPage', {
                templateUrl: 'views/surveyPage.html',
                url: '/user/surveyPage/:surveyId',
                controller: 'userSurveyCtrl',
                resolve: {
                    auth: function(authService, $state, $stateParams) {
                        return authService.checkForAuth()
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                            })
                            .catch(function(err) {
                                // For any error, send them back to admin landing screen.
                                console.error('err = ', err);
                                $state.go('login', {
                                    successRedirect: 'user'
                                });
                            });
                    }
                }
            })



            .state('login', {
                url: '/',
                templateUrl: 'views/loginPage.html',
                params: {
                    toastMessage: '',
                    successRedirect: ''
                }
            });


        // .state('login', {
        // url: '/',
        // templateUrl: 'LocalAuth/views/login.html',
        //     // params : {
        //     //     toastMessage: '',
        //     //     successRedirect: ''
        //     // },
        // controller: 'localLoginCtrl'
        // })
        // .state('signup', {
        // url: '/signup',
        // templateUrl: 'LocalAuth/views/signup.html',
        // controller: 'localSignupCtrl'
        // })




    })
