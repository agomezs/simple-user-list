(function(w, d){
  'use strict';
  
  var overlay = {
    enable: function() {
      var el = d.querySelector('.overlay');
      el.classList.add('active');   
    },
    disable:function() {
      var el = d.querySelector('.overlay');
      el.classList.remove('active');   
    }
  };
  
  // w.$.overlay = overlay;
  
})(window, document)