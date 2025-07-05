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
    discoverPage: '.discover-wrapper',
    songList: '.songs-wrapper',
    discoverSong: '.discover-song',
    discoverInner: '.discover-page-wrapper',
  },
  templatesOf: {
    homePage: '#template-homePage',
    searchPage: '#template-searchPage',
    discoverPage: '#template-discoverPage',
    song: '#template-song',
    discoverRefresh: '#template-discoverRefresh',
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    mainInput: '.search-input',
    categorySelect: '.search-category-select',
    button: '.search-button',
    results: '.search-results',
  },
  discover: {
    button: '.discover-refresh-button',
  },
  musicWidget: {
    audioPlayer: '.audio-player',
    homePage: '.home-page-wrapper',
    searchPage: '.search-page-wrapper',
    discoverPage: '.discover-page-wrapper',
    audio: 'audio',
  },
  categories: {
    categoryItem: '.category-item',
  }
}

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
  category: {
    active: 'active',
  },    
}

export const templates = {
    homePage: Handlebars.compile(document.querySelector(select.templatesOf.homePage).innerHTML),
    searchPage: Handlebars.compile(document.querySelector(select.templatesOf.searchPage).innerHTML),
    discoverPage: Handlebars.compile(document.querySelector(select.templatesOf.discoverPage).innerHTML),
    song: Handlebars.compile(document.querySelector(select.templatesOf.song).innerHTML),
    discoverRefresh: Handlebars.compile(document.querySelector(select.templatesOf.discoverRefresh).innerHTML),
}