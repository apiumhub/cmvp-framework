/**
 * Created by jose on 31/03/15.
 */
app.registerView(function (container) {
    "use strict";

    var ViewRepaintAspect = container.getService('cmvp/aspects/ViewRepaintAspect');

    var BaseView = {};

    BaseView.constructor = function (self, $scope, presenter, model) {
        self.event = {};
        self.fn = {};
        self.data = {};
        self.$scope = $scope;

        $scope.event = self.event;
        $scope.fn = self.fn;
        $scope.data = self.data;

        self.presenter = presenter;
        self.model = model;
    };

    BaseView.newInstance = function ($scope, $presenter, $model, classes) {
        var View = classes.view;

        var scope = $scope || {};
        var presenter = $presenter || makeNewInstanceOrThrow(classes.presenter, 'presenter');
        var model = $model || makeNewInstanceOrThrow(classes.model, 'model');

        var view = new View(scope, presenter, model);
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