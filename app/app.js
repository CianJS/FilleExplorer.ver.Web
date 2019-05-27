var app = angular.module('app', ['ngMaterial', 'ngMessages']);

app.controller('TestCtrl', ($scope, $http, $mdDialog) => {
  $scope.fileAlign = true;
  $scope.data = [];

  $scope.toggleChange = () => {
    $scope.fileAlign = !$scope.fileAlign;
  };

  $scope.showPrompt = (ev) => {
    var confirm = $mdDialog.prompt()
      .title('사용하시려는 폴더의 절대경로를 입력해주세요.')
      .textContent('Ex) C:/Users/username/Downloads')
      .placeholder('Directory Path')
      .targetEvent(ev)
      .required(true)
      .ok('확인')
      .cancel('취소');

    $mdDialog.show(confirm).then((res) => {
      console.log("TCL: $scope.showPrompt -> res", res)
      $scope.getSelect(res);
    });
  };

  $scope.errorPrompt = () => {
    var confirm = $mdDialog.confirm()
      .title('경로가 잘못되었습니다.')
      .ok('확인');

    $mdDialog.show(confirm);
  };

  $scope.getSelect = (path) => {
    $http({
      method: 'POST',
      url: '/directory',
      data: { path },
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then((res) => {
      $scope.data = res.data;
    }).catch(() => {
      $scope.errorPrompt();
    });
  }
});
