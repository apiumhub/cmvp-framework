/**
 * Created by jose on 31/03/15.
 */
define(function (require) {
    "use strict";

    var ViewRepaintAspect = require('cmvp/aspects/ViewRepaintAspect');

    var BaseView = {};

    BaseView.constructor = function (self, di) {
        self.event = {};
        self.fn = {};
        self.data = {};
        self.di = di;

        di.$scope.event = self.event;
        di.$scope.fn = self.fn;
        di.$scope.data = self.data;
    };

    BaseView.newInstance = function (di, classes) {
        var View = classes.view;

        di = di || {};
        di.$scope = di.$scope || {};
        di.presenter = di.presenter || classes.presenter.newInstance(di);
        di.model = di.model || classes.model.newInstance(di);

        var view = new View(di);
        ViewRepaintAspect.weave(view);
        return view;
    };

    BaseView.methods = {};
    BaseView.methods.show = function () {
        this.di.presenter.show(this, this.di.model);
    };

    BaseView.methods.showError = function (error) {
        console.error(error);
    };

    return BaseView;
});