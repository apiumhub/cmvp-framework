describe('<%= cmvpName %>Controller', function () {
    "use strict";
    var <%= cmvpName %>Controller = app.getController('controllers/<%= cmvpName %>Controller');
    var ControllerHelper = test.getHelper('Controller');
    ControllerHelper.testCallsViewShow(<%= cmvpName %>Controller);
});