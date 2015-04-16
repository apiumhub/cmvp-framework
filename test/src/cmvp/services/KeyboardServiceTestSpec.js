/**
 * Created by jose on 5/03/15.
 */
describe("KeyboardService", function () {
    "use strict";
    var KeyboardService = app.getService("cmvp/services/KeyboardService");
    var sinon = app.getService("sinon");

    var sut;
    beforeEach(function () {
        sut = KeyboardService.newInstance();
    });

    var exerciseRegisterCallbackForKey = function (key, refresh) {
        var spy = sinon.spy();
        var register = 'onKey' + key.name;
        sut[register](spy);
        var handler = sut.getHandler(refresh || function () {});
        handler({keyCode: key.code});
        expect(spy.callCount).toBe(1);
        return spy;
    };

    function getKeyProvider () {
        var keyProvider = [];
        for (var name in KeyboardService.keyMap) {
            if (KeyboardService.keyMap.hasOwnProperty(name)) {
                keyProvider.push({name: name, code: KeyboardService.keyMap[name]});
            }
        }
        return keyProvider;
    }

    getKeyProvider().forEach(function (key) {
        it("should register callback for key " + key.name, function () {
            exerciseRegisterCallbackForKey(key);
        });
    });

    it("should return a handler callback, that updates when is invoked", function () {
        var spy = sinon.spy();
        exerciseRegisterCallbackForKey({name: "Up", code: KeyboardService.keyMap['Up']}, spy);
        expect(spy.callCount).toBe(1);
    });

    it("should not react when the event triggered is not registered", function () {
        var spy = sinon.spy();
        exerciseRegisterCallbackForKey({name: "Up", code: KeyboardService.keyMap['Up']});
        var handler = sut.getHandler(spy);
        handler({keyCode: KeyboardService.keyMap['Down']});
        expect(spy.callCount).toBe(0);
    });

    it("should keep all the handlers simultaneously", function () {
        var provider = getKeyProvider();
        var spies = [];
        provider.forEach(function (key) {
            spies.push(exerciseRegisterCallbackForKey(key));
        });
        var handler = sut.getHandler(function () {});
        provider.forEach(function (key, i) {
            handler({keyCode: key.code});
            expect(spies[i].callCount).toBe(2);
        });

        expect(spies.length).toBe(provider.length);
    });
});