export default class DefaultPlayback {
    constructor({ container, events, EVENTS }) {
        console.log("Container", container);
        console.log("Events", events);
        console.log("EVENTS", EVENTS);
    }

    static canPlay(source) {
        return /.+\.mp4/.test(source);
    }
}