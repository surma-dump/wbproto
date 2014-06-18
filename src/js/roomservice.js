angular.module('whiteboard')
.factory('rfc4122', function () {
  return {
    newuuid: function () {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = '0123456789abcdef';
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-';
      return s.join('');
    }
  }
})
.factory('RoomService', ['$firebase', 'rfc4122', function($firebase, rfc4122) {
  var userId = localStorage.getItem('whiteboard_userId');
  if (!userId) {
    userId = rfc4122.newuuid();
    localStorage.setItem('whiteboard_userId', userId);
  }

  return function(base, roomName) {
    var fbRoom = $firebase(new Firebase(base + '/' + roomName));
    var undoHistory = [];
    var room = {
      onchange: function() {},
      push: function(ev) {
        undoHistory = [];
        if(!(fbRoom[userId] instanceof Array)) {
          fbRoom[userId] = [];
        }
        fbRoom[userId].push(ev);
        fbRoom.$save(userId);
      },
      undo: function() {
       undoHistory.push(fbRoom[userId].pop());
       fbRoom.$save(userId);
      },
      redo: function() {
        fbRoom[userId].push(undoHistory.pop());
        fbRoom.$save(userId);
      }
    };
    fbRoom.$on('change', function() {
      room.onchange(fbRoom);
    });
    return room;
  };
}]);
