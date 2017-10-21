angular.module('starter.services', [])
.factory('DB', function($http, $q) {
  return {
    save: function (key, value){
      localStorage.setItem(key, JSON.stringify(value));
    },
    load: function(key){
      var jsonString = localStorage.getItem(key);
      return JSON.parse(jsonString);
    }
  }
})

.factory('Util', function($http, $q) {
  return {
    getIndexOfItem: function(item, lista){
      var itemEncontrado = false;
      for(var i in lista){
        var itemLista = lista[i];
        if(itemLista.id === item.id){
          itemEncontrado = i; 
        }
      }

      return itemEncontrado;
    }
  }
})
.factory('Vereadores', function($http, $q, DB, Util) {

  return {
    all: function() {
      // return promise with vereadores data
      var promise = $http.get('/mock/mock-vereadores.json').then(function (response) {
        var myFollowedVereadores = DB.load("vereador_follow");

        // flag nos vereadores que estou seguindo
        for(var i in response.data){
          var vereador = response.data[i];
          vereador.follow = (Util.getIndexOfItem(vereador, myFollowedVereadores) !== false);
        }
      
        return response.data;
      });

      // Return the promise to the controller
      return promise;
    },
    allFollowed: function() {
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {
          myFollowedVereadores = DB.load("vereador_follow");
          resolve(myFollowedVereadores);
      });
    },
    addFollow: function(vereador){
      myFollowedVereadores = DB.load("vereador_follow");
      if(!myFollowedVereadores){
        myFollowedVereadores = [];
      }

      if(Util.getIndexOfItem(vereador, myFollowedVereadores) === false){
        myFollowedVereadores.push(vereador);
        DB.save('vereador_follow', myFollowedVereadores);
      } else {
        console.log("Tentativa de adicionar item que ja existe na lista de Follow vereadores");
      }
    },
    removeFollow: function(vereador){
      myFollowedVereadores = DB.load("vereador_follow");
      var indice = Util.getIndexOfItem(vereador, myFollowedVereadores);
      if(indice !== false){
        myFollowedVereadores.splice(indice, 1);
      }
     
      DB.save('vereador_follow', myFollowedVereadores);
    },
    get: function(vereadorId) {

      myFollowedVereadores = DB.load("vereador_follow");
      if(myFollowedVereadores){
        for (var i = 0; i < myFollowedVereadores.length; i++) {
          if (myFollowedVereadores[i].id === parseInt(vereadorId)) {
            return myFollowedVereadores[i];
          }
        }
      }
      return null;
    }
  };
});
