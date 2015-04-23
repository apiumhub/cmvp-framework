/**
 * Created by jose on 1/04/15.
 */
test.registerHelper("Controller", function() {
    "use strict";

    var Scope = test.getHelper('Scope');

    return {
        testCallsViewShow: function (Controller, anotherParam) {
            describe("constructor", function () {
                describe("always", function () {
                    it("should call the show method of the view", function () {
                        var $scope = Scope.getStub();
                        var spy = spyOn($scope, "$apply");
                        var controller = new Controller($scope, anotherParam);
                        expect(spy).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});