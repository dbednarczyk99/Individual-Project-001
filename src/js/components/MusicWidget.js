import utils from '../utils.js';
import { templates, select } from '../settings.js'
/* global GreenAudioPlayer */

class MusicWidget {
    constructor(song){
        const thisWidget = this;
        thisWidget.song = song;

        thisWidget.renderWidget();
        thisWidget.initWidget();
    }

    renderWidget() {
        const thisWidget = this;
        thisWidget.dom = {};
        thisWidget.dom = document.querySelector(select.containerOf.songList);
                
        const generategHTML = templates.song(thisWidget.song);
        thisWidget.element = utils.createDOMFromHTML(generategHTML);
        thisWidget.dom.appendChild(thisWidget.element);
    }

    initWidget() {
        const thisWidget = this;
        GreenAudioPlayer.init({
            selector: select.containerOf.audioPlayer + thisWidget.song.id,
            stopOthersOnPlay: true
        });
    }
}

export default MusicWidget;