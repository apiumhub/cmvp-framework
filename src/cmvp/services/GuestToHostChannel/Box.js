/**
 * Created by jose on 13/04/15.
 */
app.registerService(function (container) {
    "use strict";

    function Box (eventHandler) {
        this.eventHandler = eventHandler;
    }

    Box.EVENT_TYPE = 'message';

    Box.prototype.addListener = function (listener) {
        this.eventHandler.addEventListener(Box.EVENT_TYPE, listener, false);
    };

    Box.prototype.removeListener = function (listener) {
        this.eventHandler.removeEventListener(Box.EVENT_TYPE, listener, false);
    };

    Box.newInstance = function (eventHandler) {
        return new Box(eventHandler);
    };

    return Box;
});