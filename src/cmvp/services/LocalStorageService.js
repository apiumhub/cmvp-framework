/**
 * Created by jose on 4/03/15.
 */
define(function (require) {
    "use strict";
    function LocalStorageService() {
        this.error = undefined;
    }

    var namespace = "";
    LocalStorageService.prototype.get = function (key) {
        var json = window.localStorage[namespace + key];
        if (void(0) === json) {
            return;
        }
        var value;
        try {
            value = JSON.parse(json);
        } catch (e) { // it does not require to be a JSON, never assume that we are the owners of the localStorage
            console.error(e);
            value = json;
        }
        return value;
    };

    LocalStorageService.prototype.set = function (key, value) {
        try {
            window.localStorage[namespace + key] = JSON.stringify(value);
        } catch (e) {
            console.error(e);
            window.localStorage[namespace + key] = value;
        }
    };

    LocalStorageService.newInstance = function () {
        return new LocalStorageService;
    };

    return LocalStorageService;
});