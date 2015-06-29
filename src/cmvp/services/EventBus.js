/**
 * Created by kevin on 10/24/14.
 */
app.register(function (require) {
    var postal = require('postal');

    function EventBus() {
        this.subscriptions = {};
    }

    EventBus.prototype.subscribe = function (parameters, id) {
        var postalSubscription = postal.subscribe(parameters);
        var newSubscription = {
            unsubscribe: postalSubscription.unsubscribe.bind(postalSubscription),
            channel: parameters.channel,
            topic: parameters.topic
        };
        if (id !== undefined) {
            var path = [parameters.channel, parameters.topic, id].reduce(function (a, b) { return a + '/' + b });
            if (this.subscriptions.hasOwnProperty(path)) {
                var subscription = this.subscriptions[path];
                subscription.unsubscribe();
                // it's a singleton, it must be mutable
                delete this.subscriptions[path];
            }
            this.subscriptions[path] = newSubscription;
        }
        return newSubscription;
    };

    EventBus.prototype.publish = function (parameters) {
        postal.publish(parameters);
    };

    EventBus.prototype.createChannel = function (channel, topic) {
        return {
            send: function (msg) {
                instance.publish({ channel: channel, topic: topic, data: msg });
                return msg;
            },

            listen: function (callback) {
                instance.subscribe({ channel: channel, topic: topic, callback: callback });
            }
        };
    };

    var instance = new EventBus();
    return { getInstance: function () { return instance; }};
});