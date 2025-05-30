import {templates, select} from '../settings.js';
import utils from '../utils.js';
import MusicWidget from './MusicWidget.js';

class HomePage {
    constructor(data) {
        const thisPage = this;
        thisPage.songs = data;

        thisPage.render();
        thisPage.getRandomSongs();
        thisPage.initWidgets();
    }

    getRandomSongs(){
        const thisPage = this;
        const songs = thisPage.songs;
        thisPage.randomSongs = [];
        const numberOfSongs = 4;
        const randomIndexArray = [];

        let i = 0;
        while(i < numberOfSongs){
            const randomIndex = Math.floor(Math.random() * songs.length);
            if(!randomIndexArray.includes(randomIndex)){
                randomIndexArray.push(randomIndex);
                thisPage.randomSongs.push(songs[randomIndex]);
                i++;
            }
        }
    }

    initWidgets() {
        const thisPage = this;
        const length = thisPage.randomSongs.length;

        for(let i = 0; i < length; i++){
            new MusicWidget(thisPage.randomSongs[i]);
        }
    }

    render() {
        const thisPage = this;
        thisPage.dom = {};
        thisPage.dom.home = document.querySelector(select.containerOf.homePage);
        
        const homeGenerategHTML = templates.homePage(thisPage.data);
        thisPage.element = utils.createDOMFromHTML(homeGenerategHTML);
        thisPage.dom.home.appendChild(thisPage.element);
    }
}

export default HomePage;