import d from 'thalleshmm-dom';
import { REQUEST_PLAY, PLAYING } from '../../constants/events';
import * as ICONS from '../../constants/icons'; 

export default class Face {
    constructor({ events }) {
        this.events = events;
        this.element = d('button', 'pipoca-controls__face', ICONS.PLAY);
        this.events.listen(PLAYING, this.hide.bind(this));
    }

    hide() {
        this.element.classList.add('pipoca-controls__face--hidden');
    }
}