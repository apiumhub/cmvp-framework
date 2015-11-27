/**
 * Created by kevin on 10/27/14.
 */
define(function (require) {
    var Q = require('q');

    function AjaxService (di) {
        this.di = di;
    }

    AjaxService.prototype.rest = function (method, path, data, options) {
        var ajaxCall = this._ajax(method, path, data, options);
        return this.di.Q.promise(function (resolve) {
            function resolveJqXHR(jqXHR) {
                delete jqXHR.then;
                resolve(jqXHR);
            }
            ajaxCall.then(function(data, textStatus, jqXHR) {
                resolveJqXHR(jqXHR);
            }, resolveJqXHR);
        });
    };

    AjaxService.prototype.ok = function (method, path, data, options) {
        return this.di.Q(this._ajax(method, path, data, options))
            .catch(this._rethrowAjaxError.bind(this));
    };

    AjaxService.prototype._ajax = function (method, path, data, options) {
        var params = this._prepareParams(method, path, data, options);
        return this.di.$.ajax(params);
    };

    AjaxService.prototype._prepareParams = function (method, path, data, options) {
        var params = options || {};
        options = options || {};
        params.dataType = options.dataType || "json";
        params.contentType = options.contentType || "application/json";
        params.url = path;
        params.type = method;
        params.cache = options.cache || false;

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
            if (exception) {
                console.error(exception);
            }
            return {status: jqXHR.status, response: jqXHR.responseText};
        }
    };

    AjaxService.newInstance = function (di) {
        di = di || {};
        di.Q = di.Q || Q;
        di.$ = di.$ || $;
        return new AjaxService(di);
    };

    return AjaxService;
});