/**
 * Created by kevin on 10/22/14.
 */

/** An application is a global object that provides decoupled DI to the current JS application
 * delegating the hard work to a defined AMD.
 *
 * You should use by default the require template, just calling the factory method
 * ApplicationFactory.newRequireApplication without parameters.
 *
 * For example:
 *
 * var myApp = ApplicationFactory.newRequireApplication();
 * myApp.registerView('MyView', ['controller/MyController', 'model/MyModelFactory'], function () {
 *  var controller = myApp.requireController('MyController');
 * });
 *
 * Applications are composable: meaning that application logic can be aggregated for using more than
 * one DI container. For example:
 *
 * var myApp = ApplicationFactory.newRequireApplication()
 *                  .composedWith(
 *                          ApplicationFactory.newAngularApplication('AngularApp', [ 'ngRoute' ], AngularConfig)
 *                  );
 **/

;(function (jsScope) {

    function App(di) {
        this.di = di;
    }

    App.newInstance = function(di) {
        di = di || {};
        di.jsScope = di.jsScope || jsScope;
        di.dom = di.dom || jsScope.document;
        di.angularModules = di.angularModules || ['ngRoute'];
        return new App(di);
    };

    App.prototype.initialize = function() {
        this._run();
    };

    App.prototype._run = function() {
        var angular        = this.di.jsScope.angular;
        var dom            = this.di.dom;
        var components     = this.di.components;
        var angularConfig  = this.di.angularConfig;
        var angularModules = this.di.angularModules;

        this.angularApp = angular.module('AngularApp', angularModules);
        this.angularApp.config(angularConfig);
        components.forEach(this._setupComponent.bind(this, this.angularApp));
        angular.bootstrap(dom, ['AngularApp']);
    };

    App.prototype._setupComponent = function(angularApp, path) {
        var component     = this._getComponent(path);
        var nameComponent = this._getComponentName(path);
        var componentType = this._getComponentType(nameComponent);

        angularApp[componentType](nameComponent, component);
    };

    App.prototype._getComponent = function(path) {
        var component = this.di.jsScope.require(path);
        component.$inject = component.$inject || ['$scope', '$routeParams'];
        return component;
    };

    App.prototype._getComponentName = function(path) {
        return path.substring(path.lastIndexOf('/') + 1);
    };

    App.prototype._getComponentType = function(nameComponent) {
        return ['directive', 'factory', 'filter', 'config', 'run', 'controller']
            .filter(function(type) {
                return nameComponent.substr(-type.length).toLowerCase() === type;
            })
            [0];
    };

    jsScope.ApplicationFactory = App;

})(window);