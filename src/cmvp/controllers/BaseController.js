/**
 * Created by jose on 31/03/15.
 */
define(function (require) {
    "use strict";
    var BaseController = {};
    BaseController.constructor = function (self, di, View) {
        self.view = View.newInstance(di);
        self.view.show();
    };

    BaseController.makeClass = function (cmvpName) {
        var View = require('views/' + cmvpName + 'View');
        return function ($scope) {
            BaseController.constructor(this, $scope, View);
        };
    };

    return BaseController;
});