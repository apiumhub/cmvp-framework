/**
 * Created by jose on 31/03/15.
 */
define(function (require) {
    "use strict";

    var ViewRepaintAspect = require('cmvp/aspects/ViewRepaintAspect');

    var BaseView = {};

    BaseView.constructor = function (self, $scope, presenter, model) {
        BaseView.constructorDI(self, {$scope: $scope, presenter: presenter, model: model});
    };

    BaseView.newInstance = function ($scope, $presenter, $model, classes) {
        function constructor (View, di) {
            return new View(di.$scope, di.presenter, di.model);
        }
        return BaseView.newInstanceDI({$scope: $scope, presenter: $presenter, model: $model}, classes, constructor);
    };

    BaseView.constructorDI = function (self, di) {
        self.event = {};
        self.fn = {};
        self.data = {};
        self.$scope = di.$scope;

        self.$scope.event = self.event;
        self.$scope.fn = self.fn;
        self.$scope.data = self.data;

        self.presenter = di.presenter;
        self.model = di.model;
    };

    BaseView.newInstanceDI = function (di, classes, constructor) {
        var View = classes.view;

        di = di || {};
        di.$scope = di.$scope || {};
        di.presenter = di.presenter || makeNewInstanceOrThrow(classes.presenter, 'presenter');
        di.model = di.model || makeNewInstanceOrThrow(classes.model, 'model');

        var view = constructor ? constructor(View, di) : new View(di);
        ViewRepaintAspect.weave(view);
        return view;
    };

    function makeNewInstanceOrThrow (klass, classType) {
        return klass.newInstance();
    }

    BaseView.methods = {};
    BaseView.methods.show = function () {
        this.presenter.show(this, this.model);
    };

    BaseView.methods.showError = function (error) {
        console.error(error);
    };

    return BaseView;
});