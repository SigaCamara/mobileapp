moduleServices.factory('URL', function($http, $q, DB, Util) {

  var config = {
    server: "http://10.1.96.202",
    port: "3000",
    version: "1"
  }

  var getServerPath = function(){
    return config.server + ":" + config.port + "/api/v" + config.version + "/"
  }

  return {
    endpoint: function(service) {
      var endpointPath = getServerPath() + service;
      return endpointPath;
    }
  };
})