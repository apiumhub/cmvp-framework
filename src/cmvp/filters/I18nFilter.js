/**
 * Created by kevin on 2/20/15.
 */
app.registerService(function (container) {
    var TranslationService = container.getService('cmvp/services/TranslationService');

    function I18nFilter(input, $scope, parameters, translationService) {
        var ts = (translationService || TranslationService.getInstance($scope));
        var value = ts.translate(input, parameters);
        return value;
    }

    return I18nFilter;
});