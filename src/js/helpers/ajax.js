(function (w) {
    'use strict';
    
    /**
     * 
     **/
    var getJson = function (url, callback) {
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', url, true);
        //xhr.responseType = "";
        
        xhr.onload = function () {
            if(this.status >= 200 && this.status < 400) {
                callback(this.response)
            }
        };
        xhr.send();
    };
    
    w.$.getJson = getJson;
    
})(window)