/**
 * Created by jose on 1/04/15.
 */
test.registerHelper("View", function() {
    "use strict";

    var $scope = test.getHelper('Scope').getStub();

    return {
        exerciseCreate : function (View) {
            var instance = View.newInstance($scope);
            expect(instance).toBeDefined();
            return instance;
        },
        testShowCallsPresenterShow: function (getSut) {
            describe("show", function () {
                describe("when new instance is used", function () {
                    it("should let the presenter do the bindings", function () {
                        var sut = getSut();
                        spyOn(sut.presenter, 'show');
                        sut.show();
                        expect(sut.presenter.show).toHaveBeenCalled();
                    });
                });
            });
        },
        testSetter: function (getSut, viewMethod, viewVariable) {
            describe(viewMethod, function () {
                describe('when receive a ' + viewVariable, function () {
                    it('should set the variable to the view', function () {
                        var sut = getSut();
                        var expected = 'anything';
                        sut[viewMethod](expected);

                        var actual = sut.data[viewVariable];

                        expect(actual).toEqual(expected);
                    });
                });
            })
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
        }
    };
});