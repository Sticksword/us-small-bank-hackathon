'use strict';

(function() {

class HomeController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    console.log('hello from HomeController constructor!');
  }

  addCoupon() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

}

angular.module('webappApp.home')
  .controller('HomeController', HomeController);

})();
