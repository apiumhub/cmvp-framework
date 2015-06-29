/**
 * Created by jose on 13/04/15.
 */
define(function (require) {
    "use strict";

    function HostReceiverChannel (box) {
        this.app = false;
        this.box = box;
        this.eventBus = false;
        this.guest = false;
    }

    HostReceiverChannel.prototype.setGuest = function (guest) {
        if (!guest) {
            throw new Error ("missing guest!!");
        }
        this.guest = guest;
        this.box.addListener(this._listenGuest.bind(this));
    };

    HostReceiverChannel.prototype._listenGuest = function (event) {
        if (event.source !== this.guest) {
            return;
        }
        var config = JSON.parse(event.data);
        this._handleForwarding(config);
    };

    HostReceiverChannel.prototype.hasGuest = function () {
        return this.guest !== false;
    };

    HostReceiverChannel.prototype._handleForwarding = function (config) {
        if (!this.eventBus) {
            throw new Error("channel is not forwarding!");
        }
        this.eventBus.publish(config);
    };

    HostReceiverChannel.prototype.forward = function (eventBus) {
        this.eventBus = eventBus;
    };

    HostReceiverChannel.newInstance = function (box) {
        return new HostReceiverChannel(box);
    };

    return HostReceiverChannel;
});