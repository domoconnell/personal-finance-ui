var WelcomeController = require('./Welcome.controller')

var Welcome = angular.module('App.Welcome', [])

.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('Welcome', {
			url:'/welcome',
			views:{
				'main-view':{
					controller: 'WelcomeController as WelcomeCtrl',
					templateUrl: 'modules/Welcome/Welcome.tmpl.html'
				}
			}
		})
	;
}])

.controller('WelcomeController', ['$scope', WelcomeController])