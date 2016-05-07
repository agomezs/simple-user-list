(function(w, d){
  'use strict';
  
  var loading = {
    show: function (className) {
      d.querySelector(className)
      .classList.add('active');
    },
    hide: function (className) {
      d.querySelector(className)
      .classList.remove('active');
    }
  };
  
  w.$.loading = loading;
  
})(window, document)