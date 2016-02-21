var app = angular.module('app', []);

app.controller('testController', ['$scope', function($scope){

  $scope.queueData = [];
  var socket = io();

  // $('form').submit(function(){
  //  socket.emit('chat message', $('#m').val());
  //  $('#m').val('');
  //  return false;
  // });

  // Add a Item to the list
 $scope.addItem = function (item) {
     $scope.queueData.push(item);
     console.log($scope.queueData);
      $scope.$apply();
 };

$scope.hasItem = function (tableID) {
  var has = false;
  $.each($scope.queueData, function( index, value){
    if(value.id == tableID){
      has = true;
    }
    if(index == $scope.queueData.length-1){
      return has;
    }
  });
};

$scope.removeItem = function (tableID) {
  $scope.queueData.forEach(function(element, index, array){
    if(element.id == tableID){
      $scope.queueData.splice(index, 1)
      $scope.$apply();
    }
  });
};

  socket.on('one-click', function(tableID){
    has = false
    for(var i = 0; i< $scope.queueData.length; i++){
      var element = $scope.queueData[i];
      if(element.id == tableID){
          has = true;
      }
    }
  });
  socket.on('double-click', function(tableID){
    if(!$scope.hasItem(tableID)){
      $scope.addItem({id: tableID, readableTime: jQuery.timeago(new Date()), status: 'check'});
    }
  });
  socket.on('hold', function(tableID){
    $scope.removeItem(tableID);
  });

  $.get('/queue', function(data){
      var queue = data.queue
      queue.forEach(function(element, index, array){
        element['readableTime'] = jQuery.timeago(element.time);
      });
      queue.forEach(function(element, index, array){
        $scope.addItem(element);
      })
  });


}]);
