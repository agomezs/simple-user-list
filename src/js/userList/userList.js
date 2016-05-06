(function (w, d, u) {
    "use strict";
    
    var USER_ITEM_TEMPLATE = '<div class="user-item center-content"><span>{USER-NAME}</span><span>({POSTS} posts)</span><div title="Delete item" id="delete-user">DELETE</div></div>';
    
    var usersElement = d.querySelector('.user-list .users');
    // Extend the user list with the Subject's (observe) methods.
    w.$.helper.extend(new w.$.Subject(),  usersElement);
    
    var fillUserList = function() {
        w.$.userService.list(function(users) {
            users.forEach(function(user){
                addUserElement(user.name, user.posts.length);
            }); 
        });
    };
    // fillUserList();
    
    function addUserElement (userName, postsCount) {
        postsCount = postsCount || 0;
        var el = USER_ITEM_TEMPLATE.replace('{USER-NAME}', userName);
        el = el.replace('{POSTS}', postsCount);
        usersElement.innerHTML = el + usersElement.innerHTML;        
    }
    
    function addUserElementClick() {
        var inputField = d.querySelector('.input-field');
        var inputValue = w.$.helper.scapeHtml(inputField.value);
        inputField.value = '';
        if(inputValue) {
            addUserElement(inputValue);
        }        
    }    
    
    // Subscribe to get the total users.
    function setTotalUsers () {
        var userCountEl = d.querySelector('#user-count');
        var count = usersElement.querySelectorAll('.user-item');
        userCountEl.innerHTML = count.length;
    }
    usersElement.subscribe(setTotalUsers);
    
    
    // Add event listeners
    
    var addDeleteEventListener = function () {
        usersElement.addEventListener('click', function (e) {
            console.log(e.target.innerText);
            if(e.target && e.target.innerText === 'DELETE') {
                // TODO: improve delete
                e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            }
        });
    }();
    
    // Fire the notify method if the users dom is modified.
    // var userList = d.querySelector('.user-list .users');
    usersElement.addEventListener('DOMSubtreeModified', function () {
        d.querySelector('.user-list .users').notify();
    });

    var addUserButton = d.querySelector('#add-user');
    addUserButton.addEventListener('click', addUserElementClick);
    
    var resetBtn = d.querySelector('#reset-list');
    resetBtn.addEventListener('click',  function() {
        usersElement.innerHTML = '';
        fillUserList();
    });
    
})(window, document)