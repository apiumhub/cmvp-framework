/**
 * Created by jose on 13/04/15.
 */
app.registerService(function (container) {
    "use strict";
    function GuestSenderChannel (box) {
        this.host = false;
        this.box = box;
    }

    GuestSenderChannel.prototype.setHost = function (source, origin) {
        if (typeof source !== 'object' || typeof source.postMessage !== 'function') {
            throw new Error("not a valid source");
        }
        this.host = {source: source, origin: origin};
    };

    GuestSenderChannel.prototype.publish = function (config) {
        if (!this.host) {
            throw new Error("host is not known, use setHost before publish");
        }
        this.host.source.postMessage(JSON.stringify(config), this.host.origin);
    };

    GuestSenderChannel.newInstance = function (box) {
        return new GuestSenderChannel(box);
    };

    return GuestSenderChannel;
});