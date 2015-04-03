describe("<%= cmvpName %>View", function () {
    'use strict';
    var <%= cmvpName %>View = app.getView('views/<%= cmvpName %>View');
    var ViewHelper = testHelper.get("View");

    var sut;
    beforeEach(function () {
        sut =  ViewHelper.exerciseCreate(<%= cmvpName %>View);
    });

    ViewHelper.testShowCallsPresenterShow(function () { return sut; });
});