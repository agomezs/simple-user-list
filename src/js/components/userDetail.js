(function(w, d) {
  'use strict';
  
  var POST_DETAIL = '<div class="post"><div>{id}.</div><div>{title}</div></div>';
  var LOADING_CLASS = '.details.page .loading';
  
  function findUserById () {
    var userId = decodeURI(window.location.hash);
    userId = userId.split('/')[1];
    w.$.userService.find(userId, setUserDetail);
  }
  
  function cleanContent() {
    d.querySelector('.details.page .post-details').innerHTML = '';
  }
  
  function setUserDetail (user) {
    w.$.loading.hide(LOADING_CLASS);
    var userEl = d.querySelector('.details.page .user-name');
    userEl.innerHTML = user.name + ' ('+ user.username +')';
    
    var postEl = d.querySelector('.details.page .post-details');
    
    user.posts.forEach(function(post) {
      var postDetail = POST_DETAIL.replace('{id}', post.id);
      var postDetail = postDetail.replace('{title}', post.title);
      postEl.innerHTML = postEl.innerHTML + postDetail;
    });
  };
  
  // Add Event Listener.
  d.querySelector('.details.page #return-btn')
    .addEventListener('click', function (){
      w.location.hash = '#';
    });;
  
  var userDetailPage = function () {
    w.$.loading.show(LOADING_CLASS);
    cleanContent();
    findUserById();
  };
  
  w.$.pages.userDetailPage = userDetailPage;
  
})(window, document)