import {templates, select, classNames} from '../settings.js';
import utils from '../utils.js';
import MusicWidget from './MusicWidget.js';

class HomePage {
    constructor(data) {
        const thisPage = this;
        thisPage.songs = data;

        thisPage.categories = [];
        thisPage.randomSongs = [];
        thisPage.getCategories();
        thisPage.render();
        thisPage.getRandomSongs();
        thisPage.initWidgets();
        thisPage.initEvents();
    }

    getCategories() {
        const thisPage = this;
        let categories = [];
        for(let song of thisPage.songs){
            for(let category of song.categories){
                if(!categories.includes(category)){
                    categories.push(category);
                }
            }
        }
        thisPage.categories = categories;
        console.log('Categories:', thisPage.categories);
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

    initEvents() {
        const thisPage = this;
        const categoryItems = thisPage.element.querySelectorAll(select.categories.categoryItem);
        for(let categoryItem of categoryItems){
            categoryItem.addEventListener('click', function(event) {
                event.preventDefault();

                const selectedCategory = categoryItem.innerText.replace(', ', '').trim();
                const isActive = categoryItem.classList.contains(classNames.category.active);

                categoryItems.forEach(item => item.classList.remove(classNames.category.active));

                const widgetContainer = thisPage.element.querySelector(select.containerOf.songList);
                widgetContainer.innerHTML = ''; 

                if(isActive) {
                    thisPage.initWidgets();
                }
                else {
                    categoryItem.classList.toggle(classNames.category.active);

                    const filteredSongs = thisPage.songs.filter(song =>
                        song.categories.includes(selectedCategory)
                    );

                    for(let song of filteredSongs){
                        new MusicWidget(song, select.musicWidget.homePage);
                    }
                }
            });
        }
    }   

    initWidgets() {
        const thisPage = this;
        const length = thisPage.randomSongs.length;

        for(let i = 0; i < length; i++){
            new MusicWidget(thisPage.randomSongs[i], select.musicWidget.homePage);
        }
    }

    render() {
        const thisPage = this;
        thisPage.dom = {};
        thisPage.dom.home = document.querySelector(select.containerOf.homePage);
        console.log(thisPage);
        
        const homeGenerategHTML = templates.homePage(thisPage);
        thisPage.element = utils.createDOMFromHTML(homeGenerategHTML);
        thisPage.dom.home.appendChild(thisPage.element);
    }
}

export default HomePage;