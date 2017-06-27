import { REQUEST_CONTROLS } from '../../constants/events';
import d from 'thalleshmm-dom';

export default class Bar {
    constructor({ events }) {
        this.lastActivity = 0;
        this.hideTime = 3000;
        this.element = d('div', 'pipoca-controls__bar');

        // Show controls when requested
        events.listen(REQUEST_CONTROLS, this.show.bind(this));

        // The bar should automatically hide
        // after some time of inactivity
        setInterval(this.hideAutomatically.bind(this), 1000);
    }

    hideAutomatically() {
        // Compare the difference of time
        // between new and the last activity.
        // Hide bar if difference is greater
        // than time set in 'this.hideTime'
        const timeDiff = new Date() - this.lastActivity;
        if (timeDiff >= this.hideTime) {
            this.hide();
        }
    }

    hide() {
        this.element.classList.remove('pipoca-controls__bar--active');
    }

    show() {
        this.lastActivity = new Date();
        this.element.classList.add('pipoca-controls__bar--active');
    }
}