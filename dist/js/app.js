import {settings, classNames, select } from './settings.js';
import HomePage from './components/HomePage.js';
import SearchPage from './components/SearchPage.js';
import DiscoverPage from './components/DiscoverPage.js';

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
          thisApp.prepareData();
          thisApp.initPages();
          
      });
  },

  prepareData: function(){
    const thisApp = this; 
    //console.log(thisApp.data.songs);
    let categories = [];
    for(let song in thisApp.data.songs){
      //console.log(thisApp.data.songs[song].categories);
      for(let category in thisApp.data.songs[song].categories){
        //console.log('Category:', category);
        if(!categories.includes(thisApp.data.songs[song].categories[category])){
          categories.push(thisApp.data.songs[song].categories[category]);
        }
      }
    }
    thisApp.data.categories = categories;
    console.log('Categories:', thisApp.data.categories);
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
    new SearchPage(thisApp.data);
    new DiscoverPage(thisApp.data);
  
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
    new DiscoverPage(thisApp.data);
  },

  preparePlayTracking: function(){
    const thisApp = this;
    if(!thisApp.data.playHistory){
      thisApp.data.playHistory = {};
    }
    if(!thisApp.data.playedCategories){
      thisApp.data.playedCategories = [];
    }
  },
    
  init: function(){
    const thisApp = this;
    console.log('*** App starting ***');
    
    thisApp.initData();
    thisApp.preparePlayTracking();

    window.thisApp = thisApp;
  }
}

app.init();