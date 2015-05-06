describe("<%= cmvpName %>Presenter", function () {
    'use strict';
    var <%= cmvpName %>Presenter = app.getPresenter('presenters/<%= cmvpName %>Presenter');
    var PresenterHelper = test.getHelper("Presenter");
    var ServiceHelper = test.getHelper("Service");

    var sut, view, model;
    beforeEach(function () {
        view = {data: {}};
        model = {};
        sut = ServiceHelper.exerciseCreate(<%= cmvpName %>Presenter);
    });

    PresenterHelper.testShowEvents(function () { return sut; }, ['onLoad']);

    describe("handleOnLoad", function () {
        describe("always", function () {
            it("should call view and/or method X", function () {
                sut.handleOnLoad(view, model);
                expect(true).toBe(true);
            });
        });
    });
});