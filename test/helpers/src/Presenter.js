/**
 * Created by jose on 1/04/15.
 */
test.registerHelper("Presenter", function() {
    "use strict";

    return {
        testShowEvents: function (getSut, expected) {
            describe("show", function () {
                describe("when view.event is empty", function () {
                    it("should define events on show", function () {
                        var view = {event: {}, fn: {}};
                        getSut().show(view, {});
                        var actual = Object.keys(view.event).sort();
                        expect(actual).toEqual(expected.sort());
                    });
                });
            });
        }
    };
});