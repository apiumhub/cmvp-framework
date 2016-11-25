/**
 * Created by jose on 4/03/15.
 */
define(function (require) {
    "use strict";
    function LocalStorage() {
        this.error = undefined;
    }

    var namespace = "";
    LocalStorage.prototype.get = function (key) {
        var json = window.localStorage[namespace + key];
        if (void(0) === json) {
            return;
        }
        var value;
        try {
            value = JSON.parse(json);
        } catch (e) { // it does not require to be a JSON, never assume that we are the owners of the localStorage
            value = json;
        }
        return value;
    };

    LocalStorage.prototype.set = function (key, value) {
        try {
            window.localStorage[namespace + key] = JSON.stringify(value);
        } catch (e) {
            window.localStorage[namespace + key] = value;
        }
    };

    LocalStorage.newInstance = function () {
        return new LocalStorage;
    };

    return LocalStorage;
});