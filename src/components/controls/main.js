import d from 'thalleshmm-dom';
import { READY, REQUEST_CONTROLS, REQUEST_PLAY_PAUSE } from '../../constants/events';
import Face from './face';
import Bar from './bar';

export default class Controls {
    constructor({ events, container, lang }) {
        this.events = events;
        this.container = container;
        this.lang = lang;
        this.bar = null;
        events.listen(READY, this._initialize.bind(this));
    }

    _initialize() {
        const face = new Face(this);
        const bar = new Bar(this);

        const wrapper = d('div', 'pipoca-controls__wrapper', [
            face.element, bar.element
        ]);

        wrapper.addEventListener('mousemove', this._onActivity.bind(this));
        wrapper.addEventListener('click', this._onClick.bind(this));
        this.container.appendChild(wrapper);
    }

    _onActivity() {
        this.events.dispatch(REQUEST_CONTROLS);
    }

    _onClick() {
        this._onActivity();
        this.events.dispatch(REQUEST_PLAY_PAUSE);
    }
}