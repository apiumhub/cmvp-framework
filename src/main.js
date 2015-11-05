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
    app = ApplicationFactory.newInstance({
        components: [],
        angularConfig: AngularConfig
    });

    app.initialize();
    return app;
}
