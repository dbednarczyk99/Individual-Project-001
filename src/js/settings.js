export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
  },
  songDb: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3000' : ''),
  }
}

export const select = {
  containerOf: {
    pages: '#pages',
    homePage: '.home-wrapper',
    searchPage: '.search-wrapper',
    discoveryPage: '.discovery-wrapper',
    songList: '.songs-wrapper',
    audioPlayer: '.audio-player',
  },
  templatesOf: {
    homePage: '#template-homePage',
    searchPage: '#template-searchPage',
    discoverPage: '#template-discoverPage',
    song: '#template-song',
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    input: '.search-input',
    button: '.search-button',
    results: '.search-results',
  },
}

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },    
}

export const templates = {
    homePage: Handlebars.compile(document.querySelector(select.templatesOf.homePage).innerHTML),
    searchPage: Handlebars.compile(document.querySelector(select.templatesOf.searchPage).innerHTML),
    discoveryPage: Handlebars.compile(document.querySelector(select.templatesOf.discoverPage).innerHTML),
    song: Handlebars.compile(document.querySelector(select.templatesOf.song).innerHTML),
}