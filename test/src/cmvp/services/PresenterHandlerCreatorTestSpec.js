/**
 * Created by jose on 14/07/2015.
 */
define(function(require) {
    'use strict';
    describe('cmvp/PresenterHandlerCreator', function() {
        var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');
        var PromiseHelper = require('test-helpers/Promise');

        function noop() {}

        beforeEach(exerciseNew(mkPresenter, mkView, mkModel));

        var sut;
        function exerciseNew(presenter, view, model) {
            return function() {
                sut = new PresenterHandlerCreator(presenter(), view(), model());
            };
        }

        function mkOptions() { return {modelMethod: 'initModel', viewSuccess: 'initDTO'}; }
        function mkModel() { return {initModel: noop}; }
        function mkPresenter() { return {handleOnInit: noop}; }
        function mkView() { return {getDTO: noop, initDTO: noop, showError: noop}; }

        function id(x) { return function() { return x; }; }

        var error = new Error('!');

        describe('createEventHandler', function() {
            function exerciseCreateEventHandler(options) {
                return function() { return sut.createEventHandler(options); };
            }
            describe('when the options are valid', function() {
                var validOptionsProvider = [
                    {options: mkOptions(), model: mkModel(), view: mkView(), presenter: mkPresenter()},
                    {options: {modelMethod: 'initModel', viewSuccess: 'initDTO', viewError: 'showDifferentError'},
                        view: {initDTO: noop, showDifferentError: noop},
                        model: mkModel(), presenter: mkPresenter()},
                    {options: {modelMethod: 'initModel', viewSuccess: 'initDTO', viewDecorator: 'getDTO'},
                        model: mkModel(), view: mkView(), presenter: mkPresenter()},
                    {options: {modelMethod: 'initModel', presenterSuccess: 'handleOnInit'},
                        model: mkModel(), view: mkView(), presenter: mkPresenter()},
                    {options: {modelMethod: 'loadProject', viewSuccess: 'initProject', viewError: 'showServerError'},
                        view: {initProject: noop, showServerError: noop},
                        model: {loadProject: noop},
                        presenter: {}
                    }
                ];
                validOptionsProvider.forEach(function(provider, i) {
                    describe(i, function() {
                        beforeEach(exerciseNew(id(provider.presenter), id(provider.view), id(provider.model)));
                        it('should not throw on createEventHandler', function() {
                            expect(exerciseCreateEventHandler(provider.options)).not.toThrow();
                        });

                        it('should not throw on calling handler', function() {
                            expect(sut.createEventHandler(provider.options)).not.toThrow();
                        });
                    });
                });

            });
            describe('when the options are invalid', function() {
                it('should throw when no modelMethod is supplied', function() {
                    expectThrowOnCreateEventHandler({viewSuccess: 'initDTO'}, 'no model method');
                });

                it('should throw when no viewSuccess or presenterSuccess supplied', function() {
                    expectThrowOnCreateEventHandler({modelMethod: 'initModel'}, 'no success handler');
                });

                it('should throw when viewSuccess and presenterSuccess are supplied at the same time', function() {
                    var options = {modelMethod: 'initModel', viewSuccess: 'initDTO', presenterSuccess: noop};
                    expectThrowOnCreateEventHandler(options, 'only one success handler is allowed');
                });

                it('should throw when there is no viewError and view.showError does not exist', function() {
                    delete sut.view.showError;
                    expectThrowOnCreateEventHandler(mkOptions(), 'viewError or view.showError needs to be defined');
                });

                it('should throw when there any method from options does not exist', function() {
                    delete sut.model.initModel;
                    expect(exerciseCreateEventHandler(mkOptions())).toThrow();
                });


                function expectThrowOnCreateEventHandler(options, message) {
                    expect(exerciseCreateEventHandler(options)).toThrow(new Error(message));
                }
            });

            describe('when calling the returned handler', function() {
                describe('when the model throws an error', function() {
                    beforeEach(function() {
                        sut.model.initModel = function() { throw error; };
                    });
                    testErrorCases();
                });

                describe('when the model returns no promises', function() {
                    beforeEach(function() {
                        spyOn(sut.model, 'initModel').and.returnValue('modelResponse');
                    });
                    testSuccessCases();
                });

                describe('when the model returns promises', function() {
                    describe('when the promise is resolved', function() {
                        beforeEach(function() {
                            spyOn(sut.model, 'initModel').and.returnValue(PromiseHelper.fake('modelResponse'));
                        });
                        testSuccessCases();
                    });
                    describe('when the promise is rejected', function() {
                        beforeEach(function() {
                            spyOn(sut.model, 'initModel').and.returnValue(PromiseHelper.fake(undefined, error));
                        });
                        testErrorCases();
                    });
                });

                function testSuccessCases() {
                    it('should call viewSuccess when the modelMethod returns a valid response', function() {
                        var spy = spyOn(sut.view, 'initDTO');
                        exerciseCallHandler(mkOptions());
                        expect(spy).toHaveBeenCalledWith('modelResponse', 'context');
                    });

                    it('should call presenterSuccess when the modelMethod returns a valid response', function() {
                        var spy = spyOn(sut.presenter, 'handleOnInit');
                        exerciseCallHandler({modelMethod: 'initModel', presenterSuccess: 'handleOnInit'});
                        expect(spy).toHaveBeenCalledWith(sut.view, sut.model, 'modelResponse', 'context');
                    });
                }

                function testErrorCases() {
                    it('should call view.showError when the modelMethod throws an error', function() {
                        var options = mkOptions();
                        expectSpyBeenCalled(spyOn(sut.view, 'showError'), options);
                    });

                    it('should call viewError instead of view.showError if defined', function() {
                        var options = mkOptions();
                        options.viewError = 'handleErrorDifferently';
                        expectSpyBeenCalled(sut.view.handleErrorDifferently = jasmine.createSpy(), options);
                    });

                    function expectSpyBeenCalled(spy, options) {
                        exerciseCallHandler(options);
                        expect(spy).toHaveBeenCalledWith(error, 'context');
                    }
                }

                function exerciseCallHandler(options) {
                    var handler = sut.createEventHandler(options);
                    handler({}, 'context');
                }
            });
        });
    });
});
