import utils from '../utils.js';
import { templates, select } from '../settings.js'
/* global GreenAudioPlayer */

class MusicWidget {
    constructor(song, location){
        const thisWidget = this;
        thisWidget.song = song;
        thisWidget.song.location = location.slice(1);
        thisWidget.location = location;
        console.log(location + ' > ' + select.containerOf.songList);

        thisWidget.renderWidget();
        thisWidget.initWidget();
    }

    renderWidget() {
        const thisWidget = this;
        //console.log(thisWidget.song);
        //console.log(thisWidget.location);
        //console.log(thisWidget.location + ' > ' + select.containerOf.songList.slice(1));

        thisWidget.dom = {};
        thisWidget.dom = document.querySelector(thisWidget.location + ' > ' + select.containerOf.songList);
        console.log(thisWidget);
                
        const generategHTML = templates.song(thisWidget.song);
        //console.log(generategHTML);
        thisWidget.element = utils.createDOMFromHTML(generategHTML);
        console.log(thisWidget.element);
        thisWidget.dom.appendChild(thisWidget.element);
    }

    initWidget() {
        const thisWidget = this;
        //console.log(thisWidget.location + '_' + select.musicWidget.audioPlayer.slice(1) + '_' + thisWidget.song.id);
        GreenAudioPlayer.init({
            selector: thisWidget.location + '_' + select.musicWidget.audioPlayer.slice(1) + '_' + thisWidget.song.id,
            stopOthersOnPlay: true
        });


        const audioPlayer = thisWidget.element.querySelector(select.musicWidget.audio);
        if(audioPlayer) {
            audioPlayer.addEventListener('play', function() {
                if(!window.thisApp.data.playHistory) {
                    window.thisApp.data.playHistory = {};
                }

                for(let category of thisWidget.song.categories) {
                    if(!window.thisApp.data.playHistory[category]) {
                        window.thisApp.data.playHistory[category] = 1;
                    }
                    else {
                        window.thisApp.data.playHistory[category]++;
                    }
                }
                console.log('Play history updated:', window.thisApp.data.playHistory);
            });
        }
    }
}

export default MusicWidget;