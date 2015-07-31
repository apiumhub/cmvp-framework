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

    Fake.prototype.then = function (fOk, fError) {
        if (!this.hasError()) {
            try {
                return this._thenOk(fOk);
            } catch (e) {
                this.error = e;
            }
        }
        return fError ? this.fail(fError) : this;
    };

    Fake.prototype._isPromise = function (promise) {
        return typeof promise === 'object' && (
            promise.constructor === Fake ||
            promise.constructor === Q);
    };

    Fake.prototype._thenOk = function (fOk) {
        var newResult = fOk(this.result);
        if (this._isPromise(newResult)) {
            return newResult;
        } else if (newResult !== undefined) {
            this.result = newResult;
        }
        return this;
    };

    Fake.prototype.fail = function (fError) {
        if (!this.hasError()) { return this; }
        try {
            this.error = fError(this.error);
        } catch (e) {
            this.error = e;
        }
        return this;
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