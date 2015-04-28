/**
 * Created by kien.nguyen on 15/04/15.
 */

app.registerService(function (container) {
    function CookieStorage () {

    }

    CookieStorage.prototype.set = function (key, value, config) {
        this._ensureIsValid(key, value);
        var cookieString = key + '=' + JSON.stringify(value);
        if (config && config.ttl) {
            var date = new Date(this._today() + config.ttl).toUTCString() ;
            cookieString = cookieString + "; expires=" + date;
        }
        document.cookie = cookieString;
    };

    CookieStorage.prototype.get = function (key) {
        this._ensureIsValid(key, "");
        var parts = document.cookie.split(';');
        var cookieStrings = parts.filter(function (cookieString) {
            return cookieString.trim().substr(0, key.length) === key;
        });
        if (cookieStrings.length === 0) {
            return undefined;
        }
        var value = cookieStrings[0].split("=")[1];
        try {
            return JSON.parse(value);
        } catch (e) {
            console.log(e);
            return value;
        }
    };

    CookieStorage.prototype.clear = function () {
        function createCookie(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }

        function eraseCookie(name) {
            createCookie(name,"",-1);
        }

        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
            eraseCookie(cookies[i].split("=")[0]);
    };

    CookieStorage.prototype._today = function () {
        return new Date().getTime();
    };

    CookieStorage.prototype._ensureIsValid = function (key, value) {
        if (_.isFunction(value) || typeof key !== 'string' || key.length === 0) {
            throw new Error("invalid key value");
        }
    };

    CookieStorage.newInstance = function () {
        return new CookieStorage();
    };

    return CookieStorage;
});
