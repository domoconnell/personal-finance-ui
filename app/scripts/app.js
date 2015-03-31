(function(){
	'use strict';
	var $ = require('jquery');
	require('angular');
	require('angular-route');
	require('angular-ui-router');
	require('angular-jwt');
	require('angular-inflector');
	require('angular-restmod');
	require('angular-animate');
	require('angular-aria');
	require('moment');
	require('angular-moment');
	
	require('../modules/Welcome/Welcome.module');

	var app = angular.module('App', [
		'ui.router',
		'angular-jwt',
		'angularUtils.directives.dirPagination',
		'restmod',
		'ngAnimate',
		'ngAria',
		'ngMaterial',
		'App.Welcome'
	])
	.factory('ApiUrlInterceptor', function () {
		return {
			request: function (config) {
				var urlParts = config.url.split('/');
				var firstSection = config.url.split('/')[1];
				if(firstSection=='api'){
					//means we're like this
					// api/dashboard/test
					urlParts.shift();
					urlParts.shift();
					config.url = 'http://server.com/api/' + urlParts.join('/');
				}
				return config;
			}
		};
	})
	.run(['$rootScope', '$state', function($rootScope, $state){
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			if(toState.name=='Redirect'){
				event.preventDefault();
				$state.go('Welcome');
				return false;
			}
		});
	}])
	.config(['$httpProvider', 'jwtInterceptorProvider', '$stateProvider', 'restmodProvider', '$urlRouterProvider', function Config($httpProvider, jwtInterceptorProvider, $stateProvider, restmodProvider, $urlRouterProvider) {
		restmodProvider.rebase('AMSApi');
		$httpProvider
			.interceptors.push('ApiUrlInterceptor');
		$stateProvider
			.state('Redirect', { url:'' })
		;
		$urlRouterProvider.otherwise('/welcome');
	}]);


})();
