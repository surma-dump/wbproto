angular.module('whiteboard')
.controller('testctrl', ['$scope', 'RoomService', function($scope, RoomService) {
  $scope.room = RoomService("https://wbproto.firebaseio.com", "room1");
  $scope.room.onchange = function(room) {
    $scope.content = JSON.stringify(room);
    $scope.$apply();
  };
}])
