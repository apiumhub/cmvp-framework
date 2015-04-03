app.registerPresenter(function (container) {
    "use strict";
    function <%= cmvpName %>Presenter() {

    }

    <%= cmvpName %>Presenter.prototype.show = function (view, model) {
        view.event.onLoad = this.handleOnLoad.bind(this, view, model);
    };

    <%= cmvpName %>Presenter.prototype.handleOnLoad = function (view, model) {

    };

    <%= cmvpName %>Presenter.newInstance = function () {
        return Some(new <%= cmvpName %>Presenter);
    };

    return <%= cmvpName %>Presenter;
});