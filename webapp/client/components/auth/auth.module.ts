'use strict';

angular.module('webappApp.auth', [
  'webappApp.constants',
  'webappApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
