/**
 * Created by jose on 11/04/15.
 */
test.registerHelper("Expect", function() {
    "use strict";

    function normalize (o) {
        function recursion(o) {
            if (typeof o !== 'object') {
                return o;
            }
            var result = Object.create(null);
            Object.keys(o).sort().forEach(function (k) {
                result[k] = recursion(o[k]);
            });
            return result;
        }

        return JSON.stringify(recursion(o));
    }

    return {
        normalize: normalize
    }
});