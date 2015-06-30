/**
 * Created by jose on 1/04/15.
 */
define(function (require) {
    "use strict";

    return {
        exerciseCreate: function (Service) {
            var instance = Service.newInstance();
            expect(instance).toBeDefined();
            return instance;
        }
    };
});