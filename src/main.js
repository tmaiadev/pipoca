import Events from 'thalleshmm-events';
import * as EVENTS from './constants/events';
import RootContainer from './components/containers/root';
import DefaultPlayback from './playback/default';

class Pipoca {

    constructor(options) {
        this.options = this._extractOptions(options);
        this.events = new Events();

        // We initialize the root container
        // that will give us the other 2 containers:
        // playback and controls
        const rootContainer = new RootContainer(this);

        // We will make the containers public
        // so plugins can manipulate the DOM
        this.containers = {
            root: rootContainer.element,
            playback: rootContainer.playback,
            controls: rootContainer.controls
        };

        // List of possible playback handlers
        let playbackList = [DefaultPlayback];

        // If custom playback is registered in options
        // set it as the first playback handler
        // in the playback list
        const customPlayback = options.playback ?
            options.playback : false;
        
        if (customPlayback) playbackList = [ customPlayback, ...playbackList ];

        // Loop through playbackList looking
        // for a playback handler that can
        // play the source
        let playback = null;
        for (let i = 0; i < playbackList.length; i++) {
            let pb = playbackList[i];
            if (pb.canPlay(options.source)) {
                playback = new (pb)({
                    container: this.containers.playback,
                    events: this.events,
                    EVENTS: EVENTS,
                    source: this.options.source
                });
                break;
            }
        }

    }

    static get EVENTS() {
        return EVENTS;
    }

    static get DefaultPlayback() {
        return DefaultPlayback;
    }

    _extractOptions(userOptions) {
        const options = {
            source: null,
            parent: null,
            width: null,
            height: null,
            volume: 100
        };

        if (typeof userOptions.source !== "string") {
            throw 'Invalid source';
        } else {
            options.source = userOptions.source;
        }

        // If parent is string, use
        // parent as querySelector
        if (typeof userOptions.parent === "string") {
            const element = document.querySelector(userOptions.parent);
            if (element)  options.parent = element;
            else throw 'Parent not found';
        } else if (userOptions.parent instanceof HTMLElement) {
            options.parent = userOptions.parent;
        }

        if (userOptions.width) {
            let width = parseInt(userOptions.width);
            if (isNaN(width)) throw 'Width is not a number';
            options.width = width;
        }

        if (userOptions.height) {
            let height = parseInt(userOptions.height);
            if (isNaN(height)) throw 'Height is not a number';
            options.height = height;
        }

        if (userOptions.volume) {
            let volume = parseInt(userOptions.volume);
            if (isNaN(volume) || volume < 0 || volume > 100) {
                throw 'Volume is not a valid number. It expects 0-100';
            }
        }

        if (userOptions.playback) {
            if (typeof userOptions.playback === "function") {
                options.playback = userOptions.playback;
            }
        }

        return options;
    }
}

window.Pipoca = Pipoca;