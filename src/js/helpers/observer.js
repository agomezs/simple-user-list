(function (w) {
    "use strict";

  // Observer list
  function ObserverList(){
    this.observerList = [];
  }

  ObserverList.prototype.Add = function(obj){
    return this.observerList.push(obj);
  };

  // // Observer object
  // function Observer() {
  //   this.update = function() {
  //
  //   };
  // }



  // Subject
  
  /**
   * The subject in the observe pattern. 
   **/
  function Subject() {
      this.observers = [];
      // this.observers = new ObserverList();
  }
  
  Subject.prototype = {
     subscribe : function(fnObserver){
      // this.observers.Add(observer);
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
