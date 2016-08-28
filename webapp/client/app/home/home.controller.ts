'use strict';

(function() {

class HomeController {

  constructor($http, $scope) {
    $http.get('/api/business/123').then(response => {
      console.log('initializing home controller');
      // this.coupons = response.data.coupons;
    });
    $scope.coupons = [{
      name: 'sample coupon'
    }];
    console.log('hello from HomeController constructor!');
    console.log($scope.coupons);

    $scope.coupon = {
      addCoupon: function() {
        console.log('add coupon');
        $scope.coupons.push({ name: 'new coupon!' });
        $http.post('/api/coupons', { name: 'new test coupon' });
      }
    };

  }



  deleteCoupon(thing) {
    console.log('delete coupon');
    $http.delete('/api/coupons/' + thing._id);
  }

}

angular.module('webappApp.home').controller('HomeController', HomeController);

})();
