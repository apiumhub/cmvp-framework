/**
 * Created by jose on 1/04/15.
 */
test.registerHelper("EventBus", function() {
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

    return {
        createSpy: function (eventBus, method) {
            var spy = new EventBusSpy();
            eventBus[method] = spy.addActual.bind(spy);
            return spy;
        }
    };
});