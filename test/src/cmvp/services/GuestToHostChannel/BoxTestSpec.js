/**
 * Created by jose on 13/04/15.
 */
describe('cmvp/GuestToHostChannel/Box', function () {
    "use strict";

    var Box = app.getService('cmvp/services/GuestToHostChannel/Box');

    var noop = function () {};

    var sut, eventHandler;
    beforeEach(function () {
        eventHandler = {addEventListener: noop, removeEventListener: noop};
        sut = Box.newInstance(eventHandler);
    });

    describe("addListener", function () {
        describe("when a listener is given", function () {
            it("should call to evnetHandler.addEventListener with 3 params", function () {
                var spy = spyOn(eventHandler, 'addEventListener');
                sut.addListener(noop);
                expect(spy).toHaveBeenCalledWith("message", noop, false);
            });
        });
    });

    describe("removeListener", function () {
        describe("when a listener is given", function () {
            it("should call to evnetHandler.removeEventListener with 3 params", function () {
                var spy = spyOn(eventHandler, 'removeEventListener');
                sut.removeListener(noop);
                expect(spy).toHaveBeenCalledWith("message", noop, false);
            });
        });
    });
});