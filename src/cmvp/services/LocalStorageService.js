/**
 * Created by jose on 4/03/15.
 */
app.registerService(function (container) {
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
        } catch (e) {
            console.log(e);
            this.error = e;
        }
        return value;
    };

    LocalStorageService.prototype.set = function (key, value) {
        window.localStorage[namespace + key] = JSON.stringify(value);
    };

    LocalStorageService.newInstance = function () {
        return new LocalStorageService;
    };

    return LocalStorageService;
});