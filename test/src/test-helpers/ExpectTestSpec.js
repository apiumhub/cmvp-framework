/**
 * Created by jose on 29/06/2015.
 */
define(function (require) {
    describe("Expect", function () {
        var Expect = require("test-helpers/Expect");

        describe("normalize", function () {
            describe("when the input is any given json object", function () {
                it("should return a json string with keys in alphabetic order", function () {
                    var input    =  {"a":"1","c":"2","b":"3"} ;
                    var expected = '{"a":"1","b":"3","c":"2"}';
                    var actual = Expect.normalize(input);
                    expect(actual).toBe(expected);
                });
            });
        })
    });
});