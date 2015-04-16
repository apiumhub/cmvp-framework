/**
 * Created by jose on 1/04/15.
 */
test.registerHelper("View", function() {
    "use strict";

    var $scope = test.getHelper('Scope').getStub();

    return {
        exerciseCreate : function (View) {
            var instance = View.newInstance($scope)
                ;
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
        }
    };
});