angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('VereadorCtrl', function($scope, Vereadores) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.listaVereadores = [];
  $scope.listaTodosVereadores = [];

  var _scope = $scope;

  Vereadores.allFollowed().then(function(data) {
    _scope.listaVereadores = data;
  });

  Vereadores.all().then(function(data) {
    _scope.listaTodosVereadores = data;
  });

  $scope.remove = function(vereador) {
    Vereadores.remove(vereador);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Vereadores) {
  $scope.vereador = Vereadores.get($stateParams.vereadorId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
