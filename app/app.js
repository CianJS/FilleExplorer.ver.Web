var app = angular.module('app', ['ngMaterial', 'ngMessages']);

app.controller('TestCtrl', ($scope, $http) => {
  $scope.fileAlign = true;

  $scope.toggleChange = () => {
    $scope.fileAlign = !$scope.fileAlign;
  };

  $scope.getSelect = () => {
    $http({
      method: 'GET',
      url: '/directory'
    }).then((res) => {
      $scope.fileList = res.data;
      console.log($scope.fileList);
    }).catch((err) => {
      console.log('Error: ' + err);
    });
  }
});
