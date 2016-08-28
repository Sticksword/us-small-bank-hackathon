'use strict';

angular.module('webappApp.payment')
  .config(function($stateProvider) {
    $stateProvider
      .state('payment', {
        url: '/payment',
        templateUrl: 'app/payment/payment.html',
        controller: 'PaymentController',
      });
  });
