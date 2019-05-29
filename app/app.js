var app = angular.module('app', ['ngMaterial', 'ngMessages']);

app.controller('TestCtrl', ($scope, $http, $mdDialog) => {
  $scope.fileAlign = true;
  $scope.data = [];
  $scope.selectFolderModal = {
    text: '사용하시려는 폴더의 절대경로를 입력해주세요.',
    context: 'Ex) C:/Users/username/Downloads',
    type: 1
  }
  $scope.createFileModal = {
    text: '생성하시려는 파일명을 입력해주세요.',
    context: '',
    type: 2
  }

  $scope.toggleChange = () => {
    $scope.fileAlign = !$scope.fileAlign;
  };

  $scope.showPrompt = (content) => {
    var confirm = $mdDialog.prompt()
      .title(content.text)
      .textContent(content.context)
      .placeholder('Directory Path')
      .required(true)
      .ok('확인')
      .cancel('취소');

    $mdDialog.show(confirm).then((res) => {
      if (content.type === 1) {
        $scope.getSelect(res);
      } else {
        $scope.createFile(res);
      }
    }).catch(() => {
    });
  };

  $scope.errorPrompt = (content, err) => {
    var confirm = $mdDialog.confirm()
      .title(content)
      .textContent(err)
      .ok('확인');

    $mdDialog.show(confirm).then(() => {
    }).catch(() => {
    });
  };

  $scope.getSelect = (path) => {
    $http({
      method: 'POST',
      url: '/directory',
      data: { path },
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then((res) => {
      $scope.data = res.data;
    }).catch((err) => {
      $scope.errorPrompt('경로가 잘못되었습니다.', err.data.path);
    });
  }

  $scope.createFile = (name) => {
    $http({
      method: 'POST',
      url: '/create/file',
      data: { name },
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then((res) => {
      console.log("TCL: $scope.createFile -> res", res)
      $scope.data.push(res.data);
      console.log("TCL: $scope.createFile -> $scope.data", $scope.data)
    }).catch((err) => {
      $scope.errorPrompt('파일 생성에 실패하였습니다.', err.data.Error);
    });
  }
});
