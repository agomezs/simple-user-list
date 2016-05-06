(function (w) {
    'use strict';
    
    var USERS_URL = 'http://jsonplaceholder.typicode.com/users';
    var POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';
    
    var users = [];
    var posts = [];
    var _callback;
    
    function buildUsersList() {
        users.forEach(function(user){
            user.posts = posts.filter(function (post) {
                return user.id === post.userId;
            });
        });
        if(_callback) {
            _callback(users);   
        }
    }
    
    function retrievePosts() {
        w.$.getJson(POSTS_URL)
        .then(function (response) {
            posts = response;
            buildUsersList();
        });
    }
    
    function retrieveUsers() {
        w.$.getJson(USERS_URL)
        .then(function (response) {
            users = response;
            // TODO: make it pararell
            retrievePosts();
        });
    }
    
    var userService = {
      list: function (callback) {
          // TODO: use a promise.
          _callback = callback;
          retrieveUsers();
      }
    };
    
    w.$.userService = userService;
    
})(window)