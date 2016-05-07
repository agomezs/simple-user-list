(function (w, d) {
    "use strict";
    
    var LOADING_CLASS = '.home.page .loading';
    var USER_ITEM_TEMPLATE = '<div class="user-item center-content" id="{ID}"><span>{USER-NAME}</span><span>({POSTS} posts)</span><div title="Go to details" id="details">...</div><div title="Delete item" id="delete-user">DELETE</div></div>';
    var LOCAL_USERS_KEY = 'local-users';
    var isLoaded = false;
    var usersElement = d.querySelector('.user-list .users');
    // Extend the user list with the Subject's (observe) methods.
    w.$.helper.extend(new w.$.Subject(), usersElement);

    function fillUserList() {
        if(!isLoaded){
            w.$.userService.list(function (users) {
                w.$.loading.hide(LOADING_CLASS);  
                isLoaded = true;
                users.forEach(function (user) {
                    addUserElement(user.name, user.id, user.posts.length);
                });
            });
        } else {
            w.$.loading.hide(LOADING_CLASS);
        }
    };

    function addUserElement(userName, userId, postsCount) {
        postsCount = postsCount || 0;
        var el = USER_ITEM_TEMPLATE.replace('{USER-NAME}', userName);
        el = el.replace('{POSTS}', postsCount);
        el = el.replace('{ID}', userId);
        usersElement.innerHTML = el + usersElement.innerHTML;
    }

    function addUserElementClick() {
        var inputField = d.querySelector('.input-field');
        var inputValue = w.$.helper.scapeHtml(inputField.value);
        inputField.value = '';
        if (inputValue) {
            var userId = usersElement.querySelectorAll('.user-item').length + 1;
            w.$.userService.add(inputValue, userId);
            addUserElement(inputValue, userId);
        }
    }

    // Subscribe to get the total users.
    function setTotalUsers() {
        var userCountEl = d.querySelector('#user-count');
        var count = usersElement.querySelectorAll('.user-item');
        userCountEl.innerHTML = count.length;
    }
    usersElement.subscribe(setTotalUsers);


    // Add event listeners

    // Handles the 'delete' and 'go to details' button.
    usersElement.addEventListener('click', function (e) {
        if (e.target) {
            if (e.target.innerText === 'DELETE') {
                // TODO: improve delete
                e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                w.$.userService.remove(e.target.parentElement.id);
            }
            else if (e.target.innerText === '...') {
                w.location.hash = '#user/' + e.target.parentElement.id;
            }
        }
    });

    // Fire the notify method if the users dom is modified.
    usersElement.addEventListener('DOMSubtreeModified', function () {
        d.querySelector('.user-list .users').notify();
    });

    var addUserButton = d.querySelector('#add-user');
    addUserButton.addEventListener('click', addUserElementClick);

    var resetBtn = d.querySelector('#reset-list');
    resetBtn.addEventListener('click', function () {
        w.$.localstorage.clean(LOCAL_USERS_KEY);
        w.$.loading.show(LOADING_CLASS);
        isLoaded = false;
        usersElement.innerHTML = '';
        fillUserList();
    });

    var userListPage = function () {
        // Init function
        w.$.loading.show(LOADING_CLASS);        
        fillUserList();
    };

    w.$.pages.userListPage = userListPage;

})(window, document)