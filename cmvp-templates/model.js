app.registerModel(function (container) {
    "use strict";

    function <%= cmvpName %>() {

    }

    <%= cmvpName %>.newInstance = function () {
        return Some(new <%= cmvpName %>);
    };

    return <%= cmvpName %>;
});
