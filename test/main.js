/**
 * Created by jose on 16/04/15.
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/TestSpec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    'baseUrl': '/base/src',
    'paths': {
        'lodash': '/base/node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '/base/node_modules/postal/node_modules/conduitjs/lib/conduit.min',
        'angular-route': '/base/node_modules/angular-route/angular-route.min',
        'angular': '/base/node_modules/angular/angular.min',
        'jquery': '/base/node_modules/jquery/dist/jquery.min',
        'postal': '/base/node_modules/postal/lib/postal.min',
        'q': '/base/node_modules/q/q',
        'framework': '/base/src/ApplicationFactory',
        'meld': '/base/node_modules/meld/meld',
        'sinon': '/base/node_modules/sinon/lib/sinon',
        'test-helpers': '/base/node_modules/cmvp-test-helpers/src'
    },

    'shim': {
        'angular': {
            exports: 'angular'
        },

        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },

        'jquery': {
            exports: '$'
        },

        'framework': {
            deps: ['angular'],
            exports: 'ApplicationFactory'
        }
    },

    'deps': ['angular', 'angular-route', 'jquery', 'q', 'sinon', 'postal', 'meld', 'framework', 'main'],

    callback: test_main
});

function test_main() {
    // initialize the base application
    main();
    // run tests
    require(app.manifest.src, function () {
        require(tests, window.__karma__.start);
    });
}

/**
 * Function.prototype.bind polyfill
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

/**
 * Object.assign polyfill
 */

if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}