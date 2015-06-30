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
        if (!this.error) {
            try {
                return this._thenOk(fOk);
            } catch (e) {
                this.error = [e];
            }
        }
        return this.fail(fError);
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
        } else if (newResult) {
            this.result = newResult;
        }
        return this;
    };

    Fake.prototype.fail = function (fError) {
        try {
            this.error = fError(this.error);
        } catch (e) {
            this.error = [e];
        }
        return this;
    };

    Fake.prototype.done = function () {
        if (!this.error) {
            return;
        }
        if (this.error instanceof Error) {
            throw this.error;
        }
        throw new Error(this.error);
    };

    Fake.prototype.catch = Fake.prototype.fail;

    return {
        fake: Fake.newInstance,
        Q: Q
    }

});