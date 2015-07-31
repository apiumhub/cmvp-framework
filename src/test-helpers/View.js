/**
 * Created by jose on 1/04/15.
 */
define(function (require) {
    "use strict";

    var $scope = require('test-helpers/Scope').getStub();

    return {
        exerciseCreate : function (View, di) {
            di = di || {};
            di.$scope = di.$scope || $scope;
            var instance = View.newInstance(di);
            expect(instance).toBeDefined();
            return instance;
        },
        testShowCallsPresenterShow: function (getSut) {
            describe("show", function () {
                describe("when new instance is used", function () {
                    it("should let the presenter do the bindings", function () {
                        var sut = getSut();
                        spyOn(sut.di.presenter, 'show');
                        sut.show();
                        expect(sut.di.presenter.show).toHaveBeenCalled();
                    });
                });
            });
        },
        testShowMethodsAreDefined: function (getSut) {
            var methodProvider = ["show", "showError"];
            methodProvider.forEach(function (method) {
                describe(method, function () {
                    it("should be the same as the base view", function () {
                        var sut = getSut();
                        expect(sut[method]).toBeDefined();
                    });
                });
            });
        },
        testInitFn: function (getSut, expected) {

            describe('_initFn', function() {
                describe('always', function() {
                    function exerciseInitFn() {
                        var sut = getSut();
                        var fn = sut.fn = {};
                        sut._initFn();
                        return fn;
                    }

                    it('should define expected properties in fn', function() {
                        var fn = exerciseInitFn();
                        var actual = Object.keys(fn);
                        expect(actual).toEqual(expected);
                    });

                    it('should define only functions', function() {
                        var fn = exerciseInitFn();
                        Object.keys(fn).forEach(function(key) {
                            expect(typeof fn[key]).toBe('function');
                        });
                    });
                });
            });
        }
    };
});