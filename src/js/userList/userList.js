(function (w, d, u) {
    "use strict";
    
    var USER_ITEM_TEMPLATE = '<div class="user-item center-content"><span>{USER-NAME}</span><span>(0 posts)</span><button>Delete</button></div>';
    
    var usersElement = d.querySelector('.user-list .users');
    // Extend the user list with the Subject's (observe) methods.
    w.$.helper.extend(new w.$.Subject(),  usersElement);
    
    function addNewUser () {
        var inputField = d.querySelector('.input-field');
        var inputValue = w.$.helper.scapeHtml(inputField.value);
        inputField.value = '';
        if(inputValue) {
            usersElement.innerHTML = USER_ITEM_TEMPLATE.replace('{USER-NAME}', inputValue) + usersElement.innerHTML;
        }
    };
    
    // Subscribe the total users function
    function setTotalUsers () {
        var userCountEl = d.querySelector('#user-count');
        var count = usersElement.querySelectorAll('.user-item');
        userCountEl.innerHTML = count.length;
    }
    usersElement.subscribe(setTotalUsers);
    
    
    // Add event listeners
    
    var addDeleteEventListener = function () {
        usersElement.addEventListener('click', function (e) {
            if(e.target && e.target.nodeName === "BUTTON") {
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
    addUserButton.addEventListener('click', function() {
        addNewUser();
    });
    
})(window, document)