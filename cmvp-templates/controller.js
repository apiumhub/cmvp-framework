app.registerController(function (container) {
    "use strict";
    var BaseController = container.getController('controllers/BaseController');
    return BaseController.makeClass("<%= cmvpName %>");
});