(function (w) {
    'use strict';
    
    var USERS_URL = 'http://jsonplaceholder.typicode.com/users';
    var POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';
    
    var users = [];
    var posts = [];
    
    function buildUsersList(_callback) {
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
        return w.$.getJson(POSTS_URL);
    }
    
    function retrieveUsers() {
        return w.$.getJson(USERS_URL);
    }
    
    function syncUserPromises(callback) {
        Promise.all([retrieveUsers(), retrievePosts()])
        .then(function (values) {
            users = values[0];
            posts = values[1];
            buildUsersList(callback);
        });
    }
    
    var userService = {
      list: function (callback) {
          // TODO: use a promise.
          syncUserPromises(callback);
      },
      find: function (userId, callback) {
        //   retrieveUsers();
          return users.find(function(user) {
              return user.id == userId; 
          });
      }
    };
    
    w.$.userService = userService;
    
})(window)