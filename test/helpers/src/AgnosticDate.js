/**
 * Created by jose on 11/04/15.
 */
test.registerHelper("AgnosticDate", function() {
    "use strict";
    var backup;
    function setRelativesToUTC () {
        backup = Object.assign({}, Date.prototype);

        Date.prototype.getFullYear     = Date.prototype.getUTCFullYear;
        Date.prototype.getMonth        = Date.prototype.getUTCMonth;
        Date.prototype.getDate         = Date.prototype.getUTCDate;
        Date.prototype.getDay          = Date.prototype.getUTCDay;
        Date.prototype.getHours        = Date.prototype.getUTCHours;
        Date.prototype.getMinutes      = Date.prototype.getUTCMinutes;
        Date.prototype.getSeconds      = Date.prototype.getUTCSeconds;
        Date.prototype.getMilliseconds = Date.prototype.getUTCMilliseconds;

        Date.prototype.setFullYear     = Date.prototype.setUTCFullYear;
        Date.prototype.setMonth        = Date.prototype.setUTCMonth;
        Date.prototype.setDate         = Date.prototype.setUTCDate;
        Date.prototype.setHours        = Date.prototype.setUTCHours;
        Date.prototype.setMinutes      = Date.prototype.setUTCMinutes;
        Date.prototype.setSeconds      = Date.prototype.setUTCSeconds;
        Date.prototype.setMilliseconds = Date.prototype.setUTCMilliseconds;
    }

    function resetRelatives () {
        if (!backup) {
            throw new Error ('cant reset!');
        }
        Object.assign(Date.prototype, backup);
    }

    return {
        setRelativesToUTC: setRelativesToUTC,
        resetRelatives: resetRelatives
    };
});