(function(w, d) {
  'use strict';
  
  var userDetailPage = function () {
  
    var POST_DETAIL = '<div>{POST-DETAIL}</div>';
    
    // Init functions
    findUserById();
    
    function findUserById () {
      var userId = decodeURI(window.location.hash);
      userId = userId.split('/')[1];
      w.$.userService.find(userId, setUserDetail);
    }
    
    function setUserDetail (user) {
      w.$.overlay.disable();
      var userEl = d.querySelector('.details.page .user-name');
      userEl.innerHTML = user.name + ' ('+ user.username +')';
      
      var postEl = d.querySelector('.details.page .post-details');
      
      user.posts.forEach(function(post) {
        var postDetail = POST_DETAIL.replace('{POST-DETAIL}', post.id + '. ' + post.title);
        postEl.innerHTML = postEl.innerHTML + postDetail;
      });
    };
  };
  
  w.$.pages.userDetailPage = userDetailPage;
  
})(window, document)