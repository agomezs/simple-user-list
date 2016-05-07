(function (w, d) {
    "use strict";
    
    var isLoaded = false;
    var USER_ITEM_TEMPLATE = '<div class="user-item center-content" id="{ID}"><span>{USER-NAME}</span><span>({POSTS} posts)</span><div title="Go to details" id="details">...</div><div title="Delete item" id="delete-user">DELETE</div></div>';
    var usersElement = d.querySelector('.user-list .users');
    // Extend the user list with the Subject's (observe) methods.
    w.$.helper.extend(new w.$.Subject(), usersElement);

    function fillUserList() {
        if(!isLoaded){
            w.$.userService.list(function (users) {
                isLoaded = true;
                users.forEach(function (user) {
                    addUserElement(user.name, user.id, user.posts.length);
                });
            });
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
            addUserElement(inputValue);
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

    usersElement.addEventListener('click', function (e) {
        if (e.target) {
            if (e.target.innerText === 'DELETE') {
                // TODO: improve delete
                e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            }
            else if (e.target.innerText === '...') {
                w.location.hash = '#user/' + e.target.parentElement.id;
            }
        }
    });

    // Fire the notify method if the users dom is modified.
    // var userList = d.querySelector('.user-list .users');
    usersElement.addEventListener('DOMSubtreeModified', function () {
        d.querySelector('.user-list .users').notify();
    });

    var addUserButton = d.querySelector('#add-user');
    addUserButton.addEventListener('click', addUserElementClick);

    var resetBtn = d.querySelector('#reset-list');
    resetBtn.addEventListener('click', function () {
        isLoaded = false;
        usersElement.innerHTML = '';
        fillUserList();
    });

    var userListPage = function () {
        // Init function
        fillUserList();
    };

    w.$.pages.userListPage = userListPage;

})(window, document)