angular.module('starter.services', [])

.factory('Vereadores', function($http, $q) {

  // Lista dos vereadores que sigo
  var myFollowedVereadores = [ {
      "id": 1,
      "name": "Max Lynx",
      "lastText": "Hey, it\"s me",
      "face": "img/max.png"
    }
  ];

  return {
    all: function() {
      // return promise with vereadores data
      var promise = $http.get('/mock/mock-vereadores.json').then(function (response) {
        return response.data;
      });

      // Return the promise to the controller
      return promise;
    },
    allFollowed: function() {
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {
        //setTimeout(function() {
          console.log(myFollowedVereadores);
          resolve(myFollowedVereadores);
        //}, 1000);
      });
    },
    remove: function(vereador) {
      myFollowedVereadores.splice(myFollowedVereadores.indexOf(vereador), 1);
    },
    get: function(vereadorId) {
      for (var i = 0; i < myFollowedVereadores.length; i++) {
        if (myFollowedVereadores[i].id === parseInt(vereadorId)) {
          return myFollowedVereadores[i];
        }
      }
      return null;
    }
  };
});
