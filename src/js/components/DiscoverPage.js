import {select, templates} from '../settings.js';
import utils from '../utils.js';
import MusicWidget from './MusicWidget.js';

class DiscoverPage {
    constructor(data) {
        const thisPage = this;
        thisPage.songs = data.songs;

        thisPage.renderPage();
        thisPage.initWidget();
        thisPage.initRefreshButton();
    }

    renderPage() {
         const thisPage = this;
        thisPage.dom = {};
        thisPage.dom.discover = document.querySelector(select.containerOf.discoverPage);
        //thisPage.dom.refresh = document.querySelector(select.containerOf.discoverInner);
        console.log(thisPage);
                
        const discoverGenerategHTML = templates.discoverPage(thisPage);
        thisPage.element = utils.createDOMFromHTML(discoverGenerategHTML);
        thisPage.dom.discover.appendChild(thisPage.element);

        //const discoverRefreshHTML = templates.discoverRefresh(thisPage);
        //thisPage.refresh = utils.createDOMFromHTML(discoverRefreshHTML);
    }

    initWidget() {
        const thisPage = this;
        const discoverContainer = document.querySelector(select.containerOf.discoverSong);
        thisPage.dom = {};
        discoverContainer.innerHTML = '';

        thisPage.dom.refresh = document.querySelector(select.containerOf.discoverInner);
        const discoverRefreshHTML = templates.discoverRefresh(thisPage);
        thisPage.refresh = utils.createDOMFromHTML(discoverRefreshHTML);

        const playHistory = window.thisApp.data.playHistory || {};
        if(!playHistory || Object.keys(playHistory).length === 0) {
            discoverContainer.innerHTML = "<p>No play history available.</p>";
            return;
        }

        if(playHistory && Object.keys(playHistory).length > 0) {
            discoverContainer.appendChild(thisPage.refresh);
            thisPage.initRefreshButton();
        }
        //console.log('Play history:', playHistory);
        let mostPlayedCategory = '';
        let maxPlays = 0;
        for(let category in playHistory) {
            if(playHistory[category] > maxPlays) {
                maxPlays = playHistory[category];
                mostPlayedCategory = category;
            }
        }

        //console.log('Most played category:', mostPlayedCategory);
        console.log(thisPage.songs);
        const filteredSongs = thisPage.songs.filter(song => song.categories.includes(mostPlayedCategory));
        console.log(thisPage.songs);


        const randomSong = filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
        new MusicWidget(randomSong, select.musicWidget.discoverPage);
    }

    initRefreshButton() {
        const thisPage = this;
        thisPage.dom.refreshButton = thisPage.refresh.querySelector(select.discover.button);
        thisPage.dom.refreshButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Refresh button clicked');
            thisPage.initWidget();
        });
    }

}

export default DiscoverPage;
