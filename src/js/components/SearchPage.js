import {templates, select} from '../settings.js';
import utils from '../utils.js';
import MusicWidget from './MusicWidget.js';

class SearchPage {
    constructor(data) {
        const thisPage = this;
        thisPage.songs = data;
        console.log(thisPage.songs);

        thisPage.render();
        thisPage.initSearch();
    }

    render() {
        const thisPage = this;
        thisPage.dom = {};
        thisPage.dom.search = document.querySelector(select.containerOf.searchPage);
        
        const searchGenerategHTML = templates.searchPage();
        console.log(searchGenerategHTML);
        thisPage.element = utils.createDOMFromHTML(searchGenerategHTML);
        console.log(thisPage.element);
        thisPage.dom.search.appendChild(thisPage.element);

        thisPage.dom.searchInput = thisPage.dom.search.querySelector(select.search.input);
        thisPage.dom.results = thisPage.dom.search.querySelector(select.search.results);

        console.log(thisPage.dom.searchInput);
    }

    initSearch() {
        const thisPage = this;

        thisPage.dom.searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            function filterSongs(song) {
                //console.log(song.categories.toLowerCase());
                const titleMatch = typeof song.title === 'string' && song.title.toLowerCase().includes(query);
                const authorMatch = typeof song.author === 'string' && song.author.toLowerCase().includes(query);
                const categoriesMatch = Array.isArray(song.categories) && song.categories.some(category => category.toLowerCase().includes(query));
                
                return titleMatch || authorMatch || categoriesMatch;
            }
            const results = thisPage.songs.filter(
                filterSongs
            );
            console.log(results);
            thisPage.renderResults(results);
            
        });
    }

    renderResults(results) {
        const thisPage = this;
        //console.log(thisPage.dom);
        //thisPage.dom.results.innerHTML = ''; // Clear previous results

        if (results.length > 0) {
            for (let song of results) {
                new MusicWidget(song);
            }
        }
        else {
            thisPage.dom.results.innerHTML = '<p>No results found</p>';
        }
    }
}

export default SearchPage;