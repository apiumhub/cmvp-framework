describe('<%= cmvpName %>Controller', function () {
    "use strict";
    var <%= cmvpName %>Controller = app.getController('controllers/<%= cmvpName %>Controller');
    var ControllerHelper = testHelper.get('Controller');
    ControllerHelper.testCallsViewShow(<%= cmvpName %>Controller);
});