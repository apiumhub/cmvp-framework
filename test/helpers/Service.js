/**
 * Created by jose on 1/04/15.
 */
test.registerHelper("Service", function() {
    "use strict";

    return {
        exerciseCreate: function (Service) {
            var instance = Service.newInstance()
                ;
            expect(instance).toBeDefined();
            return instance;
        }
    };
});