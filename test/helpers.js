;(function(global) {
    "use strict";
    "test";

    var store = {};

    var test = global.test = global.test || {};

    test.registerHelper = function (id, callback) {
        if (store[id] !== undefined) {
            throw new Error("Repeated test helper: " + id);
        }
        store[id] = {loaded: false, helper: callback};
    };
    test.getHelper = function (id) {
        var entry = store[id];
        if (entry === undefined) {
            throw new Error("Undefined test helper: " + id);
        }
        if (!entry.loaded) {
            entry.helper = entry.helper();
            entry.loaded = true;
        }
        return entry.helper;
    };

}(this));