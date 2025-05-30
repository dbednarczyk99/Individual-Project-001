import {settings, classNames, select } from './settings.js';

import HomePage from './components/HomePage.js';
import SearchPage from './components/SearchPage.js';

const app = {
  initData: function(){
    const thisApp = this;

    thisApp.data = {}

    const url = settings.db.url + '/songs';
    //const url = 'db/app.json';

    fetch(url)
      .then(function(rawResponse) {
        return rawResponse.json();
      })
      .then(function(parsedResponse) {
          thisApp.data.songs = parsedResponse;
          thisApp.initPages();
      });
  },

  initPages: function(){
    const thisApp = this;

    thisApp.dom = {};
    thisApp.dom.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.dom.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.substring(2);
    console.log(thisApp.dom.pages[0].id);

    let useId = thisApp.dom.pages[0].id;
    for(let page of thisApp.dom.pages){
      if(page.id === idFromHash){
        useId = idFromHash;
        break;
      }
    }
    thisApp.activatePage(useId);

    for(let link of thisApp.dom.navLinks){
      link.addEventListener('click', function(event){
        event.preventDefault();
        const clickedElement = this;
        const pageId = clickedElement.getAttribute('href').substring(1);
        thisApp.activatePage(pageId);

        window.location.hash = '#/' + pageId;
      });
    }

    new HomePage(thisApp.data.songs);
    new SearchPage(thisApp.data.songs);
    //new DiscoverPage(thisApp.data.songs);
  
  },
  activatePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.dom.pages){
      page.classList.toggle(classNames.pages.active, page.id === pageId);
    }

    for(let navLink of thisApp.dom.navLinks){
      navLink.classList.toggle(
        classNames.nav.active,
        navLink.getAttribute('href') === '#' + pageId
      );
    }
  },
    
  init: function(){
    const thisApp = this;
    console.log('*** App starting ***');
    
    thisApp.initData();
  }
}

app.init();