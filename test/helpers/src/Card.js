/**
 * Created by jose on 10/04/15.
 */
test.registerHelper("Card", function() {
    "use strict";

    return {
        exerciseValidJSON : function () {
            return {
                "permissions"   : ["eyeos.group.550bd493acffd60e00150c8d.administrator"],
                "expiration"    : 1427446903,
                "renewCardDelay": 12600,
                "username"      : "a-username"
            };
        },
        exerciseValidCard : function () {
            return JSON.stringify(this.exerciseValidJSON());
        }
    };
});