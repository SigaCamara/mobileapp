angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('BairrosCtrl', function($scope, Bairros, $rootScope, $ionicHistory, DB, $timeout) {
  var vm = this;
  this.listaItems = [];


  Bairros.allFollowed().then(function(data) {
    vm.listaItems = data;
    //Bairros.addFollow(data[0]);
  });
})

.controller('VereadorCtrl', function($scope, Vereadores, $rootScope, $ionicHistory, DB, $timeout) {
  var vm = this;
  this.listaVereadores = [];

  Vereadores.allFollowed().then(function(data) {
    vm.listaVereadores = data;
  });
})

.controller('VereadorAdicionarCtrl', function($scope, Vereadores, $rootScope, $ionicHistory, DB,  $state,  $stateParams) {
  var vm = this;
  this.listaTodosVereadores = [];

  this.updateFollow = function(vereador) {
    vereador.follow_loading = true;
    if(vereador.follow === true){
      Vereadores.addFollow(vereador).then(function(){
        vereador.follow_loading = false;
      });
    } else {
      Vereadores.removeFollow(vereador).then(function(){
        vereador.follow_loading = false;
      });
    }
  };

  Vereadores.all().then(function(data) {
    vm.listaTodosVereadores = data;
  });
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Vereadores) {
  $scope.vereador = Vereadores.get($stateParams.vereadorId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
