/**
 * Created by jose on 19/08/2015.
 */
define(function(require) {
    'use strict';

    function PresenterHandlerCreator(presenter, view, model) {
        this.presenter = presenter;
        this.view = view;
        this.model = model;
    }

    PresenterHandlerCreator.prototype.createEventHandler = function(options) {
        if (!options.modelMethod) {
            throw new Error('no model method');
        }

        if (!options.viewSuccess && !options.presenterSuccess) {
            throw new Error('no success handler');
        }

        if (options.viewSuccess && options.presenterSuccess) {
            throw new Error('only one success handler is allowed');
        }

        if (!options.viewError && !this.view.showError) {
            throw new Error('viewError or view.showError needs to be defined');
        }

        var handler = new EventHandler(this._makeCallbacks(options));
        return handler.handle.bind(handler);
    };

    PresenterHandlerCreator.prototype._makeCallbacks = function(options) {
        var view = this.view;
        var presenter = this.presenter;
        var model = this.model;

        return {
            decoratorCb: options.viewDecorator ?
                view[options.viewDecorator].bind(view) :
                function(dto) { return dto; },

            modelCb: model[options.modelMethod].bind(model),

            successCb: options.viewSuccess ?
                view[options.viewSuccess].bind(view) :
                presenter[options.presenterSuccess].bind(presenter, view, model),

            errorCb: options.viewError ?
                view[options.viewError].bind(view) :
                view.showError.bind(view)
        };
    };

    function EventHandler(callbacks) {
        this.callbacks = callbacks;
    }

    EventHandler.prototype.handle = function(DTO, context) {
        var self = this;
        try {
            var response = self._getResponse(DTO, context);
            if (self._isPromise(response)) {
                response
                    .then(function(dto) { self._handleSuccess(dto, context); })
                    .catch(function(e) { self._handleError(e, context); });
            } else {
                self._handleSuccess(response, context);
            }
        } catch(e) {
            self._handleError(e, context);
        }
    };

    EventHandler.prototype._getResponse = function(DTO, context) {
        return this.callbacks.modelCb(this.callbacks.decoratorCb(DTO, context));
    };

    EventHandler.prototype._isPromise = function(response) {
        return response && response.then;
    };

    EventHandler.prototype._handleError = function(e, context) {
        this.callbacks.errorCb(e, context);
    };

    EventHandler.prototype._handleSuccess = function(dto, context) {
        this.callbacks.successCb(dto, context);
    };

    return PresenterHandlerCreator;
});
