(function (w) {
    'use strict';
    
    var USERS_URL = 'http://jsonplaceholder.typicode.com/users';
    var POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';
    
    var users = [];
    var posts = [];
    var usersFormated = []
    
    function buildUsersList() {
        users.forEach(function(user){
            user.posts = posts.filter(function (post) {
                return user.id === post.userId;
            });
        });
    }
    
    function retrievePosts() {
        w.$.getJson(POSTS_URL)
        .then(function (response) {
            posts = response;
            buildUsersList();
        });
    }
    
    function retrieveUsers(response) {
        w.$.getJson(USERS_URL)
        .then(function (response) {
            users = response;
            // TODO: make it pararell
            retrievePosts();
        });
    }
    
    var userService = {
      getUsers: function () {
          return users;
      }
    };
    
    w.$.userService = userService;
    
})(window)