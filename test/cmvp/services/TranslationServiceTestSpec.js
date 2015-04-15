/**
 * Created by kevin on 2/20/15.
 */
describe("TranslationService", function () {
    var i18next = app.getService('i18next');
    var TranslationService = app.getService('cmvp/services/TranslationService');
    var sut;
    var languageModelInstance;
    var LanguageSelectorModel = app.getModel('models/LanguageSelectorModel');
    var sinon = app.getService("sinon");
    var Q = app.getFunction("q");
    var $scope = test.getHelper('Scope').getStub();
    var promise = test.getHelper("Promise");

    describe("translate", function () {
        function exerciseTranslationService(onLoad) {
            var instance = new TranslationService(i18next, $scope);
            instance.initLanguage('test', undefined, 'base/locales/__ns__/__lng__.json')
                .then(onLoad)
                .done();

            return instance;
        }

        beforeEach(function () {
            languageModelInstance = LanguageSelectorModel.newInstance();
            sut = exerciseTranslationService();
        });

        afterEach(function () {
            TranslationService.releaseInstance();
        });


        it("should return the key on unknown value", function () {
            var key = 'keyNotExist';
            var value = sut.translate(key);

            expect(value, 'we use the default language text as the translation key').toBe(key)
        });

        it("should return the value of a known value", function (done) {
            exerciseTranslationService(function (t) {
                var value = t('keyExist');
                expect(value).toBe("hi");
                done();
            });
        });

        it('should loadStoredLanguage', function () {
            spyOn(languageModelInstance, 'getStoredSelectedLanguage').and.returnValue('spa');
            var spy = spyOn(sut, 'initLanguage');
            TranslationService._loadStoredLanguage(sut, languageModelInstance);

            expect(spy).toHaveBeenCalled();
            expect(sut.i18n).toBeDefined();
        });
    });

    describe("initLanguage", function () {
        // nothing to do the test since initLanguage has been tested pair with the TranslationService constructor
    });

    describe("getInstance", function () {

        afterEach(function () {
            TranslationService.releaseInstance();
        });

        function exerciseCreateLangModel(storedLang, serverLang){
            var langModel = LanguageSelectorModel.newInstance();
            sinon.stub(langModel, "getStoredSelectedLanguage").returns(storedLang);
            sinon.stub(langModel, "getSelectedLanguage").returns(serverLang);
            return langModel;
        }

        it("should load language from server", function (done) {
            var expected = "adfd";
            var langModel = exerciseCreateLangModel(false, Q(expected));
            var sut = TranslationService.getInstance($scope, langModel, {
                init: function(config){
                    expect(config.lng).toBe(expected);
                    done();
                }
            });
        });

        it("should language from server only one time", function(){
            var expected = "adfd";
            var langModel = exerciseCreateLangModel(false, promise.fake(expected));
            var i18n = {init: sinon.spy()};
            TranslationService.getInstance($scope, langModel, i18n);
            TranslationService.getInstance($scope, langModel, i18n);
            expect(i18n.init.callCount).toBe(1);
        });

        it("should load language from local and reload if lang in server is different", function(){
            var langModel = exerciseCreateLangModel("b", promise.fake("a"));
            var i18n = {init: sinon.spy()};
            var sut = TranslationService.getInstance($scope, langModel, i18n);
            expect(i18n.init.callCount).toBe(2);
        });

    });
});