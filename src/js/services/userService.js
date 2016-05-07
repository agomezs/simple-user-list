(function (w) {
    'use strict';
    
    var USERS_URL = 'http://jsonplaceholder.typicode.com/users';
    var POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';
    
    var users = [];
    
    function buildUsersList(posts, callback) {
        users.forEach(function(user){
            user.posts = posts.filter(function (post) {
                return user.id === post.userId;
            });
        });
        if(callback) {
            callback(users);   
        }
    }
    
    function postsPromise() {
        return w.$.getJson(POSTS_URL);
    }
    
    function usersPromise() {
        return w.$.getJson(USERS_URL);
    }
    
    function syncUserPromises(callback) {
        Promise.all([usersPromise(), postsPromise()])
        .then(function (values) {
            users = values[0];
            buildUsersList(values[1], callback);
        });
    }
    
    var userService = {
      list: function (callback) {
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