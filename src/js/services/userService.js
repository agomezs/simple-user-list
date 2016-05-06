(function (w) {
    
    var USERS_URL = 'https://jsonplaceholder.typicode.com/users';
    var POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
    
    function doSometing(response) {
        console.log('res', response);
    }
    
    var UserService = {
      getUsers: function () {
          w.$.getJson(USERS_URL, doSometing);
      }
    };
    
    UserService.getUsers();
    
    w.$.prototype.userService = new UserService;
    
})(window)