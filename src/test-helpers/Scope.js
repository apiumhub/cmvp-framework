define(function (require) {
    "use strict";

    function getStub () {
        return {
            $apply: function () {},
            $on: function () {}
        };
    }

    return {
        getStub: getStub
    };
});