import d from 'thalleshmm-dom';
import { READY, REQUEST_CONTROLS } from '../../constants/events';
import Face from './face';
import Bar from './bar';

export default class Controls {
    constructor({ events, container, lang }) {
        this.events = events;
        this.container = container;
        this.lang = lang;
        events.listen(READY, this.render.bind(this));
    }

    render() {
        const face = new Face(this);
        const bar = new Bar(this);

        const controls = d('div', 'pipoca-controls__wrapper', [
            face.element, bar.element
        ]);

        controls.addEventListener('mousemove', () => this.events.dispatch(REQUEST_CONTROLS));

        this.container.appendChild(controls);
    }
}