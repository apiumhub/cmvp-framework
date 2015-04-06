describe("<%= cmvpName %>Presenter", function () {
    'use strict';
    var <%= cmvpName %>Presenter = app.getPresenter('presenters/<%= cmvpName %>Presenter');
    var PresenterHelper = test.getHelper("Presenter");
    var ServiceHelper = test.getHelper("Service");

    var sut;
    beforeEach(function () {
        sut = ServiceHelper.exerciseCreate(<%= cmvpName %>Presenter);
    });

    PresenterHelper.testShowEvents(function () { return sut; }, ['onLoad']);

    describe("handleOnLoad", function () {
        describe("always", function () {
            it("should call view and/or method X", function () {
                // arrange
                var view = {}, model = {};

                // act
                sut.handleOnLoad(view, model);

                // assert
                expect(true).toBe(true);
            });
        });
    });
});