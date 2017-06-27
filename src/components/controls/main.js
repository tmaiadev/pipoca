import d from 'thalleshmm-dom';
import { READY } from '../../constants/events';
import Face from './face';

export default class Controls {
    constructor({ events, container, lang }) {
        this.events = events;
        this.container = container;
        this.lang = lang;
        events.listen(READY, this.render.bind(this));
    }

    render() {
        const face = new Face(this);

        const controls = d('div', 'pipoca-controls__wrapper', [
            face.element
        ]);

        this.container.appendChild(controls);
    }
}