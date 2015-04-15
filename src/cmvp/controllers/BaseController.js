/**
 * Created by jose on 31/03/15.
 */
app.registerController(function (container) {
    "use strict";
    var BaseController = {};
    BaseController.constructor = function (self, $scope, View) {
        self.view = View.newInstance($scope);
        self.view.show();
    };

    BaseController.makeClass = function (cmvpName) {
        var View = container.getView('views/' + cmvpName + 'View');
        return function ($scope) {
            BaseController.constructor(this, $scope, View);
        };
    };

    return BaseController;
});