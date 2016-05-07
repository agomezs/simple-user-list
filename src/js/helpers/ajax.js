(function (w) {
    'use strict';
    
    var ajax = function (url, method) {
        method = method || 'GET';
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            
            xhr.onload = function () {
                if(xhr.status >= 200 && xhr.status < 400) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(console.error( req.statusText));
                }
            }; 
            xhr.onerror = function () {
              reject(console.error("Something went wrong..."));  
            };
            xhr.send();
        });
    };
    
    w.$.getJson = ajax;
    
})(window)
