app.registerView(function (container) {
    "use strict";
    var <%= cmvpName %>Presenter = container.getPresenter('presenters/<%= cmvpName %>Presenter');
    var <%= cmvpName %>Model = container.getModel('models/<%= cmvpName %>Model');
    var BaseView = container.getView('cmvp/views/BaseView');

    function <%= cmvpName %>View($scope, presenter, model) {
        BaseView.constructor(this, $scope, presenter, model);
    }

    <%= cmvpName %>View.prototype.show = BaseView.methods.show;

    <%= cmvpName %>View.newInstance = function ($scope, presenter, model) {
        var view = BaseView.newInstance($scope, presenter, model, {
            presenter: <%= cmvpName %>Presenter,
            model: <%= cmvpName %>Model,
            view: <%= cmvpName %>View
        });
        return view;
    };

    return <%= cmvpName %>View;
});