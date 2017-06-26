import d from 'thalleshmm-dom';
import controlsContainer from './controls';
import playbackContainer from './playback';
import { REQUEST_FULLSCREEN } from '../constants/events';

export default class {
    constructor({ options, events }) {
        this._options = options;
        this.element = d('div', 'pipoca-root', [
            playbackContainer, controlsContainer
        ]);
        this.playback = playbackContainer;
        this.controls = controlsContainer;
        this._calcSize();

        // Listens to fullscreen request
        events.listen(REQUEST_FULLSCREEN, this.enterFullscreen);

        // When window is resized, resize element
        window.addEventListener('resize', this._calcSize.bind(this));

        // Clear parent and append element to parent
        this._options.parent.innerHTML = '';
        this._options.parent.appendChild(this.element);
    }

    _calcSize() {
        // If width is not set, get parent's width
        const width = this._options.width ? 
                    this._options.width : this._options.parent.clientWidth;

        // If height is not set, then height
        // should be 16x9 aspect ration based on the width
        const height = this._options.height ?
                       this._options.height : parseInt(width * 0.5625);

        // Set elemnt style
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
    }

    enterFullscreen() {
        const requestFullscreen = this.element.requestFullscreen || this.element.msRequestFullscreen ||
            this.element.mozRequestFullScreen || this.element.webkitRequestFullscreen;

        if (requestFullscreen) requestFullscreen();
    }
}