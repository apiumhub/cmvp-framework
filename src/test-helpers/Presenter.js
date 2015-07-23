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
        },
        exerciseRequestModel: function(getModel, getView, getSut) {
            return function(options) {
                var sut, model, view;
                beforeEach(function() {
                    sut = getSut();
                    model = getModel();
                    view = getView();
                });
                var method = options.method,
                    modelMethod = options.modelMethod,
                    modelMethodCalledWith = options.modelMethodCalledWith,
                    successHandler = options.successHandler,
                    errorHandler = options.errorHandler,
                    viewMethod = options.viewMethod,
                    viewMethodReturn = options.viewMethodReturn;

                function exerciseCallHandler() {
                    if (viewMethod) view[viewMethod].returns(viewMethodReturn);
                    sut[method](view, model);
                }

                describe('always', function() {
                    if (viewMethod) it('calls to view', function() {
                        model[modelMethod].returns(PromiseHelper.fake('ok'));
                        exerciseCallHandler();
                        expect(view[viewMethod].called).toEqual(true);
                    });

                    it('calls to model', function() {
                        model[modelMethod].returns(PromiseHelper.fake('ok'));
                        exerciseCallHandler();
                        expect(model[modelMethod].calledWith(modelMethodCalledWith)).toEqual(true);
                    });
                });

                describe('when ' + method + ' is successful', function() {
                    it('should call to view ' + successHandler, function() {
                        model[modelMethod].returns(PromiseHelper.fake('ok'));
                        exerciseCallHandler();
                        expect(view[successHandler].called).toEqual(true);
                    });
                });

                describe('when ' + method + ' is not successful', function() {
                    it('should not call to view ' + successHandler, function() {
                        model[modelMethod].returns(PromiseHelper.fake(undefined, 'error!'));
                        exerciseCallHandler();
                        expect(view[successHandler].called).toEqual(false);
                    });

                    it('should call to showError', function() {
                        model[modelMethod].returns(PromiseHelper.fake(undefined, 'error!'));
                        exerciseCallHandler();
                        expect(view[errorHandler].called).toEqual(true);
                    });
                });
            }
        }
    };
});