(function (w) {
    "use strict";

  // Subject
  
  /**
   * The subject in the observe pattern. 
   **/
  function Subject() {
      this.observers = [];
  }
  
  Subject.prototype = {
     subscribe : function(fnObserver){
       this.observers.push(fnObserver);
    },
    notify : function(context) {
      var observerCount = this.observers.count;
  
      this.observers.forEach(function(fnObserver){
        fnObserver();
      });
    }
  };

  w.$.Subject = Subject;

})(window)
