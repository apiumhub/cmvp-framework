/**
 * Created by jose on 16/04/15.
 */
var app = null;

function main() {
    /** AngularJS App Configuration **/
    function AngularConfig($routeProvider, $compileProvider, $sceDelegateProvider) {

    }

    AngularConfig.$inject = [ '$routeProvider', '$compileProvider', '$sceDelegateProvider' ];

    /** Application Building **/
    app = ApplicationFactory.newRequireApplication("RequireJS")
        .composedWith(ApplicationFactory.newAngularApplication('AngularApp', [ 'ngRoute' ], AngularConfig));

    app.manifest = {
        authors: [ 'apium tech' ],
        version: 0.1,
        src: [
            'cmvp/services/EventBus',
            'cmvp/services/AjaxService',
            'cmvp/services/CookieStorage',
            'cmvp/services/LocalStorageService',
            'cmvp/aspects/ViewRepaintAspect',
            'cmvp/services/KeyboardService',
            'cmvp/services/GuestToHostChannel/Builder',
            'cmvp/services/GuestToHostChannel/Box',
            'cmvp/services/GuestToHostChannel/GuestSenderChannel',
            'cmvp/services/GuestToHostChannel/HostReceiverChannel',

            // Bases CMVP
            'cmvp/controllers/BaseController', 'cmvp/views/BaseView'
        ]
    };

    /** Application basic configuration **/
    app.registerObject({name: 'SourceList', dependencies: app.manifest.src}, function () {
        return app.manifest.src;
    });

    app.registerObject({name: "Application", dependencies: ["SourceList"]}, function () {
        return app;
    });

    app.initialize();
    return app;
}
