'use strict';

angular.module('surveyApp').controller('adminCtrl', function ($scope) {});
'use strict';

angular.module('surveyApp', ['ui-router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '.views/home.html',
		controller: 'adminCtrl'
	});
});
"use strict";
//# sourceMappingURL=bundle.js.map
