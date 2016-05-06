
(function (w) {
    "use strict";
    
    var helper =  {
        scapeHtml: function (str) {
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        },
        extend: function (obj, extension){
            for ( var key in obj ){
                extension[key] = obj[key];
            }
        }
    };
    
    w.$.helper = helper;
})(window)


