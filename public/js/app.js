var app = angular.module('app', []);

app.controller('testController', ['$scope', 'dataFactory', function($scope, dataFactory){

  $scope.queueData = {};


  $scope.requestQueue = function() {
    dataFactory.getQueue().then(function(res){
      //console.log(res.queue);
      $scope.queueData = res.queue;
      
    });
  };


}]); 

app.factory('dataFactory', function($http, $q){
  //setting up basic factory variables
  var queryUrl = '/queue';
  var service = {};

  service.getQueue = function() {
    var deferred = $q.defer();
    $http.get(queryUrl)
    .success(function(res){
      service.data = res.data;
      deferred.resolve(res);
    })
    .error(function(err, status){
      deferred.reject(err);
      
    })
    return deferred.promise;
  };

  return service; 

});



