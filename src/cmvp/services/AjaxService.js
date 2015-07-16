/**
 * Created by kevin on 10/27/14.
 */
define(function (require) {
    var Q = require('q');

    function AjaxService (headerProvider) {
        this.headerProvider = headerProvider;
    }

    AjaxService.prototype.rest = function (method, path, data) {
        var params = this._prepareParams(method, path, data);
        return Q($.ajax(params));
    };

    AjaxService.prototype.ajax = function (method, path, data) {
        return this.rest(method, path, data)
            .catch(this._rethrowAjaxError.bind(this));
    };

    AjaxService.prototype._prepareParams = function (method, path, data) {
        var params = {
            dataType: "json",
            contentType: "application/json",
            type: method,
            url: path
        };

        if (this.headerProvider) {
            params.headers = this.headerProvider.getHeader();
        }

        if (data) {
            params.data = (typeof data == 'string' || data instanceof String) ? data : JSON.stringify(data);
        }
        return params;
    };

    AjaxService.prototype._rethrowAjaxError = function (jqXHR, exception) {
        if (jqXHR.status === 0) {
            throw new Error('Connection error. Verify Network.');
        } else if (jqXHR.status == 404) {
            throw new Error('Requested page not found. [404]');
        } else if (jqXHR.status == 500) {
            throw new Error('Internal Server Error [500].');
        } else if (exception === 'parsererror') {
            throw new Error('Requested JSON parse failed.');
        } else if (exception === 'timeout') {
            throw new Error('Time out error.');
        } else if (exception === 'abort') {
            throw new Error('Ajax request aborted.');
        } else {
            throw new Error('Uncaught AJAX Error.n' + jqXHR.responseText);
        }
    };

    AjaxService.newInstance = function (headerProvider) {
        return new AjaxService(headerProvider);
    };

    return AjaxService;
});