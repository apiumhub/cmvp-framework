/**
 * Created by jose on 1/04/15.
 */
define(function (require) {
    "use strict";

    var Scope = require('test-helpers/Scope');

    return {
        testCallsViewShow: function (Controller) {
            describe("constructor", function () {
                describe("always", function () {
                    it("should call the show method of the view", function () {
                        var $scope = Scope.getStub();
                        var spy = spyOn($scope, "$apply");
                        var controller = new Controller({$scope: $scope});
                        expect(spy).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});