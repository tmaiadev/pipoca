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
        this.events.listen(EVENTS.PAUSE, this.pause.bind(this));
        this.events.listen(EVENTS.REQUEST_PLAY_PAUSE, this.togglePlay.bind(this));
    }

    render() {
        const video = d('video', {
            src: this.options.source,
            className: 'pipoca-playback__video',
            playsinline: ''
        });

        this.container.appendChild(video);
        this.element = video;

        video.addEventListener('playing', () => this.events.dispatch(EVENTS.PLAYING));
        video.addEventListener('pause', () => this.events.dispatch(EVENTS.PAUSE));
        video.addEventListener('error', () => this.events.dispatch(EVENTS.ERROR));
        video.addEventListener('ratechange', () => {
            this.events.dispatch(EVENTS.FRAMERATE_CHANGED, parseInt(video.playbackRate * 100));
        });
        video.addEventListener('volumechange', () => {
            this.events.dispatch(EVENTS.VOLUME_CHANGED, parseInt(video.volume * 100));
        });
    }

    isPlaying() {
        return !this.element.paused;
    }

    play() {
        this.element.play();
    }

    pause() {
        this.element.pause();
    }

    togglePlay() {
        if (this.isPlaying()) {
            this.pause();
        } else {
            this.play();
        }
    }
}