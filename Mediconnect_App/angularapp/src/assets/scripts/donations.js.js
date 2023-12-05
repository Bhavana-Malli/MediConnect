angular.module('donationsApp', [])
  .controller('DonationsController', function($scope, $http) {
    $scope.donors = [];

    $http.get('inc/donations.php')
      .then(function(response) {
        $scope.donors = response.data;
      }, function(error) {
        console.error('Error fetching donor data:', error);
      });
  });
