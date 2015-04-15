app.registerController(function (container) {
    "use strict";
    var BaseController = container.getController('cmvp/controllers/BaseController');
    return BaseController.makeClass("<%= cmvpName %>");
});