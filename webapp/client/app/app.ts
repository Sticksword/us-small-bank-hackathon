'use strict';

angular.module('webappApp', [
  'webappApp.auth',
  'webappApp.admin',
  'webappApp.payment',
  'webappApp.home',
  'webappApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
