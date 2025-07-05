import {templates, select} from '../settings.js';
import utils from '../utils.js';
import MusicWidget from './MusicWidget.js';

class SearchPage {
    constructor(data) {
        const thisPage = this;
        thisPage.songs = data.songs;
        thisPage.categories = data.categories;
        //console.log(thisPage.categories);

        thisPage.render();
        thisPage.initMainSearch();
    }

    render() {
        const thisPage = this;
        thisPage.dom = {};
        thisPage.dom.results = {};
        thisPage.dom.search = document.querySelector(select.containerOf.searchPage);
        //console.log(thisPage.dom.search);
        
        const searchGenerategHTML = templates.searchPage(thisPage);
        //console.log(searchGenerategHTML);
        thisPage.element = utils.createDOMFromHTML(searchGenerategHTML);
        //console.log(thisPage.element);
        thisPage.dom.search.appendChild(thisPage.element);

        thisPage.dom.mainSearchInput = thisPage.dom.search.querySelector(select.search.mainInput);
        thisPage.dom.categorySearchSelect = thisPage.dom.search.querySelector(select.search.categorySelect);
        thisPage.dom.searchButton = thisPage.dom.search.querySelector(select.search.button);
        thisPage.dom.results = thisPage.dom.search.querySelector(select.containerOf.songList);

        //console.log(thisPage.dom.results);
        //console.log(thisPage.dom.mainSearchInput);
    }

    initMainSearch() {
        const thisPage = this;

        thisPage.dom.searchButton.addEventListener('click', function(event) {
            event.preventDefault();

            function filterSongs(song) {
                const query = thisPage.dom.mainSearchInput.value.toLowerCase();
                const selectedCategory = thisPage.dom.categorySearchSelect.value;

                const titleMatch = typeof song.title === 'string' && song.title.toLowerCase().includes(query);
                const authorMatch = typeof song.author === 'string' && song.author.toLowerCase().includes(query);
                const categoriesMatch = Array.isArray(song.categories) && song.categories.some(category => category.includes(selectedCategory));
                
                if(selectedCategory === '') {
                    if(query.length == 0) {
                        return true; // If no query and no category, return all songs
                    }
                    else if(query.length > 0) {
                        return (titleMatch || authorMatch) && query.length > 0;
                    }
                }

                if(selectedCategory !== '' && query.length > 0) {
                    return (titleMatch || authorMatch) && categoriesMatch && query.length > 0;
                }
                if(selectedCategory !== '' && query.length === 0) {
                    return categoriesMatch && query.length === 0;
                }
            }
            const results = thisPage.songs.filter(filterSongs);
            //console.log(results);
            thisPage.renderResults(results);
        });


        // thisPage.dom.mainSearchInput.addEventListener('input', function() {
        //     //console.log('Search query:', thisPage.dom.mainSearchInput);
        //     const query = thisPage.dom.mainSearchInput.value.toLowerCase();
            
        //     function filterSongs(song) {
        //         //console.log(song.categories.toLowerCase());
        //         const titleMatch = typeof song.title === 'string' && song.title.toLowerCase().includes(query);
        //         const authorMatch = typeof song.author === 'string' && song.author.toLowerCase().includes(query);
        //         //const categoriesMatch = Array.isArray(song.categories) && song.categories.some(category => category.toLowerCase().includes(query));
                
        //         return (titleMatch || authorMatch) && query.length > 0;
        //     }
        //     const results = thisPage.songs.filter(filterSongs);
        //     console.log(results);
        //     thisPage.renderResults(results);
            
        // });

        // thisPage.dom.categorySearchSelect.addEventListener('change', function() {
        //     //console.log('Category selected:', thisPage.dom.categorySearchSelect.value);
        //     const selectedCategory = thisPage.dom.categorySearchSelect.value.toLowerCase();
            
        //     function filterSongsByCategory(song) {
        //         //console.log(song.categories);
        //         const categoriesMatch = Array.isArray(song.categories) && song.categories.some(category => category.includes(selectedCategory));
        //         return categoriesMatch && selectedCategory.length > 0;
        //     }
        //     const results = thisPage.songs.filter(filterSongsByCategory);
        //     console.log(results);
        //     thisPage.renderResults(results);
        // });
    }

    renderResults(results) {
        const thisPage = this;
        //console.log(thisPage.dom);
        thisPage.dom.results.innerHTML = ''; // Clear previous results

        if (results.length > 0) {
            for (let song of results) {
                new MusicWidget(song, select.musicWidget.searchPage);
            }
        }
        else {
            thisPage.element = utils.createDOMFromHTML('<p>No results found</p>');
            //console.log(thisPage.element);
            //console.log(thisPage.dom);
            thisPage.dom.results.appendChild(thisPage.element);
            
            //thisPage.dom.results.innerHTML = '<p>No results found</p>';
        }
    }
}

export default SearchPage;