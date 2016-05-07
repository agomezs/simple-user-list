(function(w, d){
  'use strict';
 
  function showErrorPage() {
      var page = d.querySelector('.main-content .error.page');
      page.classList.add('show');
  }
  
  function showPage() {    
    
    var url = decodeURI(window.location.hash) || '';
    url = url.split('/');
    
    var pageEls = d.querySelectorAll('.main-content .page');
    var elsCount = pageEls.length;   

    for (var i = 0; i < elsCount; ++i) {
      pageEls[i].classList.remove('show');
    }
    
    var routes = {
      // Home page - User List  
      '': function () {
        var el = d.querySelector('.main-content .home.page');
        
        el.classList.add('show');
      },
      // User detail page
      '#user': function () {
        if(url.length == 2) {
          var index = url[1].trim();
          var el = d.querySelector('.main-content .details.page');
          el.classList.add('show');
        } else {
          showErrorPage()
        }
      }    
    };    

    if(url.length > 0 && routes[url[0]]) {
      routes[url[0]]();
    } else {
      showErrorPage();
    }
    
  }
  
  showPage();
  
  function locationChange () {
    showPage();
  }
  
  w.onhashchange = locationChange;
  
})(window, document)