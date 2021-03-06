(function (w) {
    'use strict';
    
    var LOCAL_USERS = 'local-users';
    
    var USERS_URL = 'http://jsonplaceholder.typicode.com/users';
    var POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';
    
    var users = [];
    var posts = [];
    var userTemp = [];  
    
    function getPostsByUserId (userId) {
        return posts.filter(function (post) {
            return userId === post.userId;
        });
    }
    
    function buildUsersList() {
        users.forEach(function(user){
            user.posts = getPostsByUserId(user.id);;
        });
        concatUsers();
        return userTemp;
    }
    
    function buildUserById(userId) {
        var currentUser = findUser(userId);         
        if(currentUser) {
            currentUser.posts = getPostsByUserId(currentUser.id);
        }
        return currentUser;
    }
    
    function findUser(userId) {
        concatUsers();
        return userTemp.find(function(user){
            return user.id == userId;
        });
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
    
    /**
     * Concats the api users with the local storage users.
     **/
    function concatUsers() {
        var local = w.$.localstorage.get(LOCAL_USERS)
        if(local && local.length > 0) {
            userTemp = users.concat(local);
        } else {            
            userTemp = Object.assign([], users);
        }
    }
    
    function addUser(userName, userId) {
        var user = {
            id: userId,
            name: userName,
            posts: [],
            username: ''
        };              
        var userList = w.$.localstorage.get(LOCAL_USERS);
        
        if(userList && userList.length > 0) {
            userList.push(user);            
        } else {
            userList = [];
            userList.push(user);
        }
        w.$.localstorage.set(LOCAL_USERS, userList);
    }
    
   function removeUser(userId) {
        var userList = w.$.localstorage.get(LOCAL_USERS);
        
        if(userList && userList.length > 0) {
            userList = userList.filter(function(user) {
                return user.id != userId;
            });
            w.$.localstorage.set(LOCAL_USERS, userList);
        } else {
            w.$.localstorage.clean(LOCAL_USERS);
        }
    }
    
    var userService = {
      list: function (callback) {
          syncUserPromises(function() {
            callback(buildUsersList());  
          });
      },
      find: function (userId, callback) {
          if(users.length > 0) {
              callback(findUser(userId));
          } else {
            syncUserPromises(function() {
                callback(buildUserById(userId));  
            });
          }
      },
      add: function (userName, userId) {
          addUser(userName, userId);
      },
      remove: function (userId) {
          removeUser(userId);
      }
    };
    
    w.$.userService = userService;
    
})(window)