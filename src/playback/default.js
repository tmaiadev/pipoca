import d from 'thalleshmm-dom';
import * as EVENTS from '../constants/events';

export default class DefaultPlayback {
    constructor({ container, events, options }) {
        this.container = container;
        this.events = events;
        this.options = options;
        this.element = null;
        this.render();
        this.listenToEvents();

        // Once video is rendered, we dispatch
        // the ready event
        events.dispatch('ready');
    }

    static canPlay(source) {
        return /.+\.mp4/.test(source);
    }

    listenToEvents() {
        this.events.listen(EVENTS.REQUEST_PLAY, this.play.bind(this));
    }

    render() {
        const video = d('video', {
            src: this.options.source,
            className: 'pipoca-playback__video'
        });

        this.container.appendChild(video);
        this.element = video;

        video.addEventListener('playing', () => {
            this.events.dispatch(EVENTS.PLAYING);
        });
    }

    play() {
        this.element.play();
    }
}