/**
 * Created by jose on 1/04/15.
 */
define(function (require) {
    "use strict";
    var sinon = require('sinon');
    var ViewHelper = require('test-helpers/View');

    return {
        exerciseCreateMVP: function (View, di) {
            var realView = ViewHelper.exerciseCreate(View, di);
            return {
                modelStub: sinon.stub(realView.di.model),
                presenter: realView.di.presenter,
                viewStub: sinon.stub(realView)
            };
        },
        testShowEvents: function (getSut, expected) {
            describe("show", function () {
                describe("when view.event is empty", function () {
                    it("should define events on show", function () {
                        var view = {event: {}, fn: {}};
                        getSut().show(view, {});
                        var actual = Object.keys(view.event);
                        expect(actual).toEqual(expected);
                    });
                });
            });
        }
    };
});