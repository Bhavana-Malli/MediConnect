angular.module('donorApp', [])
  .controller('DonorController', function($scope, $http) {
    $scope.organsValid = false;
    $scope.isOtherOrgansValid = true;

    $scope.submitForm = function() {
      if ($scope.donorForm.$valid && $scope.organsValid && $scope.isOtherOrgansValid) {
        var formData = {
          organs: $scope.donorForm.organs.$modelValue,
          otherOrgansInput: $scope.donorForm.otherOrgansInput.$modelValue,
          // ... Extract other form field values ...
        };

        $http.post('inc/donor.php', formData)
          .then(function(response) {
            console.log('Data saved successfully:', response.data);
            $scope.donorForm.$setPristine();
            $scope.donorForm.$setUntouched();
            $scope.organsValid = false;
            $scope.isOtherOrgansValid = true;
          }, function(error) {
            console.error('Error saving data:', error);
          });
      }
    };
  });
