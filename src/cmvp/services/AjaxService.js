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

    AjaxService.prototype._rethrowAjaxError = function (jqXHR, textStatus, errorThrown) {
        throw {
            status: jqXHR.status,
            responseText: jqXHR.responseText,
            textStatus: textStatus,
            errorThrown: errorThrown
        };
    };

    AjaxService.newInstance = function (di) {
        di = di || {};
        di.Q = di.Q || Q;
        di.$ = di.$ || $;
        return new AjaxService(di);
    };

    return AjaxService;
});
