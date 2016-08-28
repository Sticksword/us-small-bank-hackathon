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
        $http.post('/api/coupon', { type: 0, discount: 5, description: 'new test coupon!' });
      }

      deleteCoupon: function(thing) {
        console.log('delete coupon');
        var index = $scope.coupons.indexOf(thing);
        if (index > -1) {
          $scope.coupons.splice(index, 1);
        }
        $http.delete('/api/coupon/123');
      }
    };

  }





}

angular.module('webappApp.home').controller('HomeController', HomeController);

})();
