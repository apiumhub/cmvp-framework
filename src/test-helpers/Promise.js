define(function (require) {
    "use strict";

    var Q = require('q');

    function Fake (result, error) {
        this.result = result;
        this.error = error;
    }

    Fake.newInstance = function (ok, error) {
        return new Fake(ok, error);
    };

    Fake.newInstance.fcall = function(fn) {
        return new Fake().then(fn);
    };

    Fake.prototype.then = function (fOk, fError) {
        if (this.hasError()) {
            return fError ? this.fail(fError) : this;
        }
        try {
            return this._thenOk(fOk);
        } catch (e) {
            var errorFake = new Fake(undefined, e);
            return fError ? errorFake.fail(fError) : errorFake;
        }
    };

    Fake.prototype._isPromise = function (promise) {
        return (typeof promise === 'object' || typeof promise === 'function') &&
            typeof promise.then === 'function';
    };

    Fake.prototype._thenOk = function (fOk) {
        var newResult = fOk(this.result);
        return this._isPromise(newResult) ? newResult : new Fake(newResult);
    };

    Fake.prototype.fail = function (fError) {
        if (!this.hasError()) { return this; }
        try {
            return new Fake(fError(this.error));
        } catch (e) {
            return new Fake(undefined, e);
        }
    };

    Fake.prototype.done = function () {
        if (!this.hasError()) {
            return;
        }
        if (this.error instanceof Error) {
            throw this.error;
        }
        throw new Error(this.error);
    };

    Fake.prototype.catch = Fake.prototype.fail;

    Fake.prototype.getActualResult = function () {
        if (this.hasError()) {
            throw this.error;
        }
        return this.result;
    };

    Fake.prototype.getActualError = function () {
        if (!this.hasError()) {
            throw new Error("error is not registered!");
        }
        return this.error;
    };

    Fake.prototype.hasError = function () {
        return !!this.error;
    };

    Fake.prototype.isOk = function () {
        return !this.hasError();
    };

    function makeExerciseFake (result, error) {
        return function () {
            return Fake.newInstance(result, error);
        }
    }

    return {
        fake: Fake.newInstance,
        makeExerciseFake: makeExerciseFake,
        exerciseFakeFail: makeExerciseFake(undefined, new Error("exerciseFakeFail error!")),
        exerciseFakeOk:   makeExerciseFake("exerciseFakeOk result!"),
        Q: Q
    }

});