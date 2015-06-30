/**
 * Created by jose on 10/04/15.
 */
define(function (require) {
    "use strict";

    function FakeStorage () {
        this.clear();
    }

    FakeStorage.prototype.set = function (k, v) {
        this.store[k] = v;
    };

    FakeStorage.prototype.get = function (k) {
        return this.store[k];
    };

    FakeStorage.prototype.clear = function () {
        this.store = {};
    };

    FakeStorage.newInstance = function () { return new FakeStorage; };

    return {
        fake: FakeStorage
    }
});