(function (w) {
    
    'use strict';
    
    var hasLocalStorage = function () {
        if (typeof (Storage) !== 'undefined') {
            return true;
        }
        else {
            console.log('Local storage not supported');
        }
    };
    
    var localstorage = {
        get: function (itemName) {
            if (hasLocalStorage()) {
                return JSON.parse(w.localStorage.getItem(itemName));
            }
        },
        set: function (itemName, value) {
            if (hasLocalStorage() && value) {
                value = JSON.stringify(value);
                w.localStorage.setItem(itemName, value);
            }
        },
        clean: function (itemName) {
             if (hasLocalStorage()) {
                w.localStorage.removeItem(itemName,[]);
            }
        }
    };
    
    w.$.localstorage = localstorage;
    
 }
    
)(window)