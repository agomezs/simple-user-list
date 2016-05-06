(function(w, d){
  'use strict';
  
  // w.addEventListener('hashchange', function () {
  //   console.log('hashchange');
  // });
  
  
  function showPage() {    
    
    var url = decodeURI(window.location.hash) || '';
    console.log('url', url);
    url = url.split('/');
    
    var pageEls = d.querySelectorAll('.main-content .page');
    var elsCount = pageEls.length;
    
    // pageEls.forEach(function(el) {
    //   el.classList.remove('show')
    // });   

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
      '#userdetail': function () {
        if(url.length == 2) {
          var index = url[1].trim();
          var el = d.querySelector('.main-content .details.page');
          el.classList.add('show');
        }
      }    
    };    
    
    if(url.length > 0) {
      routes[url[0]]();
    }
    
  }
  
  showPage();
  
  function locationChange () {
    showPage();
  }
  
  w.onhashchange = locationChange;
  
})(window, document)