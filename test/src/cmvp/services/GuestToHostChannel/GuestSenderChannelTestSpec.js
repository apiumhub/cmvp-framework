/**
 * Created by jose on 13/04/15.
 */
define (function (require) {
    describe('cmvp/GuestToHostChannel/GuestSenderChannel', function () {
        "use strict";

        var GuestSenderChannel = require('cmvp/services/GuestToHostChannel/GuestSenderChannel');

        var noop = function () {};

        var sut;
        beforeEach(function () {
            sut = GuestSenderChannel.newInstance();
        });


        function exerciseSetHost () {
            var expected = {source: {postMessage: noop}, origin: "origin"}
            sut.setHost(expected.source, expected.origin);
            expect(sut.host).toEqual(expected);
        }

        describe("setHost", function () {
            describe("when valid origin and source is given", function () {
                it("should put it in sut.host", exerciseSetHost);
            });

            describe("when invalid source", function () {
                it("should throw an error", function () {
                    var actual = sut.setHost.bind(sut, "not a object");
                    expect(actual).toThrow();
                });
            });
        });

        describe("publish", function () {
            describe("when host is set", function () {
                it("should call post message with config", function () {
                    var config = {data: 'example'};
                    exerciseSetHost();
                    var spy = spyOn(sut.host.source, 'postMessage');
                    sut.publish(config);
                    expect(spy).toHaveBeenCalledWith(JSON.stringify(config), sut.host.origin);
                });
            });

            describe("when host is not set", function () {
                it("should call post message with config", function () {
                    var actual = sut.publish.bind(sut);
                    expect(actual).toThrow();
                });
            });
        });
    });
});

