/**
 * Created by jose on 14/07/2015.
 */
define(function (require) {
    'use strict';

    return {
        testMethodForward: function (getSut, options) {
            var method = options.method;
            var input = options.input;
            var forwarding = options.forwarding;
            describe(method, function() {
                describe('always', function() {
                    var returnValue = 'ajax-service-result';
                    var sut, spy, actual;
                    beforeEach(function() {
                        sut = getSut();
                        spy = spyOn(sut.di.ajaxService, 'ajax').and.returnValue(returnValue);
                        actual = sut[method].apply(sut, input);
                    });
                    it('should call once to the ajax service', function() {
                        expect(spy.calls.count()).toBe(1);
                    });

                    it('should call the ajax service with parameters', function() {
                        expect(spy.calls.allArgs()).toEqual([forwarding]);
                    });

                    it('should return the result of the ajax service', function() {
                        expect(actual).toBe(returnValue);
                    });
                });
            });
        }
    };
});