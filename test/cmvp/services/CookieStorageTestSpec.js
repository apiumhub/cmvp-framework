/**
 * Created by kien.nguyen on 15/04/15.
 */
describe('CookieService', function () {
    var CookieStorage = app.getService('cmvp/services/CookieStorage');
    var sut;
    beforeEach(function () {
        sut = CookieStorage.newInstance();
        sut.clear();
    });

    describe('set', function () {
        describe('when receive valid key and value', function () {
            var cookieKVProvider = [
                {key: 'dummyKey', value: 'dummyValue', expected: 'dummyKey="dummyValue"'},
                {key: 'dummyKey', value: 3, expected: 'dummyKey=3'},
                {key: 'dummyKey', value: [1,2,3], expected: 'dummyKey=[1,2,3]'},
                {key: 'dummyKey', value: true, expected: 'dummyKey=true'},
                {key: 'dummyKey', value: {json:{a: 3}}, expected: 'dummyKey="{\\"json\\":{\\"a\\":3}}"'}
           ];
            cookieKVProvider.forEach(function (provider, i) {
                it('should save to cookie.' + i, function () {
                    var key = provider.key;
                    var value = provider.value;

                    sut.set(key, value);
                    var actual = document.cookie;
                    expect(actual).toContain(provider.expected);
                });
            });
        });

        describe('when receive invalid key or value', function () {

                var cookieKVProvider = [
                    {key: 'dummyKey', value: function () {}},
                    {key: null,       value: 'dummyValue'} ,
                    {key: 1,          value: 'dummyValue'} ,
                    {key: false,      value: 'dummyValue'} ,
                    {key: {},         value: 'dummyValue'},
                    {key: [],         value: 'dummyValue'}
                ];
                cookieKVProvider.forEach(function (provider, i) {
                    it('should throw Error.' + i, function () {
                        var key = provider.key;
                        var value = provider.value;

                        expect(function () {sut.set(key, value);}).toThrow();
                    });
                });
        });

        describe('when receive a valid key, value and config object', function () {
            it('should save the ttl', function () {
                var key = 'dummyKey';
                var value = 'dummyValue';
                var config = {ttl: 60*30*1000};
                var timestamp = Date.UTC(9999,1,1,0,30);
                spyOn(sut, '_today').and.returnValue(timestamp);
                var expected = 'dummyKey="dummyValue"';
                sut.set(key, value, config);
                var actual = document.cookie;
                expect(actual).toContain(expected);
            });
        });

    });

    describe('get', function () {
        describe('when receive a valid key for non-set value', function () {
            it('should return undefined', function () {
                var actual = sut.get('key');
                expect(actual).toBe(undefined);
            });
        });
        describe('when receive a valid key after set', function () {
            it('should return the value', function () {
                var key = 'dummyKey';
                var value = 'dummyValue';
                sut.set(key, value);
                var actual = sut.get(key);
                expect(actual).toEqual(value);
            });
        });

        describe('when receive a valid key after two set', function () {
            it('should return the value', function () {
                sut.set('1', '2');
                sut.set('3', '4');
                var actual = sut.get("3");
                expect(actual).toEqual("4");
            });
        });

        describe('when receive a key is invalid', function () {
            var cookieInvalidKeyProvider = [null, 1, false, {}, []];
            cookieInvalidKeyProvider.forEach(function (key, i) {
                it('should throw an error.' + i, function () {
                    var value = 'dummyValue';
                    var actual = sut.get.bind(sut, key);
                    expect(actual).toThrow();
                });
            });
        });
    });
});