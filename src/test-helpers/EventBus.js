/**
 * Created by jose on 1/04/15.
 */
define(function (require) {
    "use strict";

    function EventBusSpy () {
        this.registry = {};
    }

    EventBusSpy.prototype.getActual = function (config) {
        return this.registry[JSON.stringify(config)] === true;
    };

    EventBusSpy.prototype.addActual = function (config) {
        this.registry[JSON.stringify(config)] = true;
    };

    EventBusSpy.prototype.getCount = function () {
        return Object.keys(this.registry).length;
    };

    EventBusSpy.prototype.expectCalled = function (config) {
        var actual = this.getActual(config);
        expect(actual).toBe(true);
    };

    EventBusSpy.prototype.expectNotCalled = function (config) {
        var actual = this.getActual(config);
        expect(actual).toBe(false);
    };

    function EventBusFake() {
        this.registry = {};
    }

    EventBusFake.prototype.subscribe = function(config) {
        var id = this._makeId(config);
        this.registry[id] = this.registry[id] || [];
        this.registry[id].push(config.callback);
    };

    EventBusFake.prototype.publish = function(config) {
        var id = this._makeId(config);
        (this.registry[id] || []).forEach(function(listener) {
            listener(config.data);
        });
    };

    EventBusFake.prototype._makeId = function(config) {
        return config.channel + ':channel/FAKE_EVENT_BUS/topic:' + config.topic;
    };

    return {
        createSpy: function (eventBus, method) {
            var spy = new EventBusSpy();
            eventBus[method] = spy.addActual.bind(spy);
            return spy;
        },
        createFake: function() {
            return new EventBusFake;
        }
    };
});