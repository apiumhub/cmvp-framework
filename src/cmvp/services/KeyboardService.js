/**
 * Created by jose on 5/03/15.
 */
app.registerService(function (container) {
    "use strict";
    function KeyboardService() {
        this.listeners = {};
    }

    KeyboardService.prototype.getHandler = function (apply) {
        var listeners = this.listeners;
        return function (event) {
            if (!listeners[event.keyCode]) {
                return;
            }
            listeners[event.keyCode](event);
            apply();
        };
    };

    KeyboardService.keyMap = {
        'Up': 38,
        'Down': 40,
        'Left': 37,
        'Right': 39,
        'Enter': 13,
        'Tab': 9
    };

    var makeListener = function (code) {
        return function (cb) {
              this.listeners[code] = cb;
        };
    };

    KeyboardService.prototype.onKeyUp = makeListener(KeyboardService.keyMap.Up);
    KeyboardService.prototype.onKeyDown = makeListener(KeyboardService.keyMap.Down);
    KeyboardService.prototype.onKeyLeft = makeListener(KeyboardService.keyMap.Left);
    KeyboardService.prototype.onKeyRight = makeListener(KeyboardService.keyMap.Right);
    KeyboardService.prototype.onKeyEnter = makeListener(KeyboardService.keyMap.Enter);
    KeyboardService.prototype.onKeyTab = makeListener(KeyboardService.keyMap.Tab);

    KeyboardService.newInstance = function () {
        return new KeyboardService;
    };

    return KeyboardService;
});