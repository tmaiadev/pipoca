import d from 'thalleshmm-dom';
import { REQUEST_PLAY, PLAYING } from '../../constants/events';
import * as ICONS from '../../constants/icons'; 

export default class Face {
    constructor({ events }) {
        this.events = events;
        this.render();
        this.events.listen(PLAYING, this.hide.bind(this));
    }

    render() {
        this.element = d('button', 'pipoca-controls__face', ICONS.PLAY);
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        this.events.dispatch(REQUEST_PLAY);
    }

    hide() {
        this.element.classList.add('pipoca-controls__face--hidden');
    }
}