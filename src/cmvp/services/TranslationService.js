/**
 * Created by kevin on 2/20/15.
 */
(function () {
    "use strict";
    var instance;
    app.registerService(function (container) {
        var i18next = container.getService('i18next');
        var Q = container.getFunction('q');
        var LanguageSelectorModel = container.getService('models/LanguageSelectorModel');
        function TranslationService(i18n) {
            this.i18n = i18n;
        }

        TranslationService.prototype.translate = function (key, params) {
            var result = this.i18n.t(key, params);
            return result == "" ? key : result;
        };

        TranslationService.prototype.initLanguage = function (lang, languageParameter, resourcePath) {
            var config = {
                detectLngQS: languageParameter || 'lang',
                resGetPath: resourcePath || 'locales/__ns__/__lng__.json',
                lng: lang,
                fallbackLng: LanguageSelectorModel.DEFAULT_LANGUAGE
            };
            var defer = Q.defer();
            this.i18n.init(config, defer.resolve.bind(defer));
            return defer.promise;
        };

        TranslationService._loadStoredLanguage = function (ts, langModel) {
            var storedLangId = langModel.getStoredSelectedLanguage();
            if (storedLangId) {
                ts.initLanguage(storedLangId);
            }
        };

        TranslationService._loadServerLanguage = function (ts, langModel) {
            var storedLangId = langModel.getStoredSelectedLanguage();

            langModel.getSelectedLanguage().then(function (serverLangId) {
                if (storedLangId !== serverLangId) {
                    ts.initLanguage(serverLangId);
                }
            });
        };

        TranslationService._create = function (langModel, i18n) {
            var langModel = langModel || LanguageSelectorModel.newInstance()
                ;
            var ts = new TranslationService(i18n || i18next, langModel);

            TranslationService._loadStoredLanguage(ts, langModel);
            TranslationService._loadServerLanguage(ts, langModel);
            return ts;
        };

        TranslationService.getInstance = function (langModel, i18n) {
            if (!instance) {
                instance = TranslationService._create(langModel, i18n);
            }
            return instance;
        };

        TranslationService.releaseInstance = function () {
            instance = undefined;
        };

        return TranslationService;
    });
}());