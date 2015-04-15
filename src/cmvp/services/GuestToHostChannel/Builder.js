/**
 * Created by jose on 13/04/15.
 */
app.registerService(function (container) {
    "use strict";

    var Box = container.getService("cmvp/services/GuestToHostChannel/Box");
    var HostReceiverChannel = container.getService("cmvp/services/GuestToHostChannel/HostReceiverChannel");
    var GuestSenderChannel = container.getService("cmvp/services/GuestToHostChannel/GuestSenderChannel");

    function GuestToHostChannelBuilder (di) {
        this.box = di.box;
        this.HostReceiverChannel = di.HostReceiverChannel;
        this.GuestSenderChannel  = di.GuestSenderChannel;
    }

    GuestToHostChannelBuilder.HOST_PING_GUEST = 'AP-HOST-PING-GUEST';
    GuestToHostChannelBuilder.GUEST_PONG_HOST = 'AP-GUEST-PONG-HOST';
    GuestToHostChannelBuilder.TRY_INTERVAL = 100;

    // this channel must be used only in the parent window, outside the iframe
    GuestToHostChannelBuilder.prototype.makeHostReceiverChannel = function (appListener, appDomain) {
        var channel = this.HostReceiverChannel.newInstance(this.box);
        this._catchPongFromGuest(channel);
        this._sendPingsToGuest(appListener, appDomain, channel);
        return channel;
    };

    // this channel must be used only in the child window, inside the iframe
    GuestToHostChannelBuilder.prototype.makeGuestSenderChannel = function () {
        var channel = this.GuestSenderChannel.newInstance(this.box);
        this._catchPingFromHost(channel);
        return channel;
    };

    GuestToHostChannelBuilder.prototype._sendPingsToGuest = function (appListener, appDomain, channel) {
        var notify = function () {
            if (channel.hasGuest()) {
                return;
            }
            appListener.postMessage(GuestToHostChannelBuilder.HOST_PING_GUEST, appDomain);
            this._setTimeout(notify, GuestToHostChannelBuilder.TRY_INTERVAL);
        }.bind(this);
        notify();
    };

    GuestToHostChannelBuilder.prototype._setTimeout = function (listener, interval) {
        setTimeout(listener, interval);
    };

    GuestToHostChannelBuilder.prototype._catchPongFromGuest = function (channel) {
        var box = this.box;
        var listener = function (event) {
            if (event.data === GuestToHostChannelBuilder.GUEST_PONG_HOST) {
                channel.setGuest(event.source);
            }
            box.removeListener(listener);
        };
        box.addListener(listener);
    };

    GuestToHostChannelBuilder.prototype._catchPingFromHost = function (channel) {
        var box = this.box;
        var listener = function (event) {
            if (event.data !== GuestToHostChannelBuilder.HOST_PING_GUEST) return;
            event.source.postMessage(GuestToHostChannelBuilder.GUEST_PONG_HOST, event.origin);
            channel.setHost(event.source, event.origin);
            box.removeListener(listener);
        };
        box.addListener(listener);
    };

    GuestToHostChannelBuilder.newInstance = function (di) {
        di = di || {};
        di.box                 = di.box                 || Box.newInstance(window);
        di.HostReceiverChannel = di.HostReceiverChannel || HostReceiverChannel;
        di.GuestSenderChannel  = di.GuestSenderChannel  || GuestSenderChannel;
        return new GuestToHostChannelBuilder(di);
    };


    return GuestToHostChannelBuilder;
});