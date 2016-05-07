(function(w, d) {
  'use strict';
  var userId = decodeURI(window.location.hash);
  userId = userId.split('/')[1];
  var currentUser = w.$.userService.find(userId,function(user) {
     console.log('user detail', user);
  });
  
})(window, document)