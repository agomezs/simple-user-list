(function (w) {
    'use strict';
    
    var USERS_URL = 'http://jsonplaceholder.typicode.com/users';
    var POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';
    
    var users = [];
    var posts = [];
    
    function buildUsersList() {
        users.forEach(function(user){
            user.posts = posts.filter(function (post) {
                return user.id === post.userId;
            });
        });
        return users;
    }
    
    function buildUserById(userId) {
        var currentUser = users.find(function(user){
            return user.id == userId;
        }); 
        if(currentUser) {
            currentUser.posts = posts.find(
                function(post) {
                    return post.userId == userId;
                }
            );
        }
        return currentUser;
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
            users = values[0] || [];
            posts = values[1] || [];
            callback();
        });
    }
    
    var userService = {
      list: function (callback) {
          syncUserPromises(function() {
            callback(buildUsersList());  
          });
      },
      find: function (userId, callback) {
          syncUserPromises(function() {
            callback(buildUserById(userId));  
          });
      }
    };
    
    w.$.userService = userService;
    
})(window)