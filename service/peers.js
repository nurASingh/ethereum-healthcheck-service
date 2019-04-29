"use strict";
var send = require('./email');

function getPeersCount(callback) {
    try {
        log.info("getPeersCount ");
        var peers = web3Http.eth.net.getPeerCount().then(callback);
    } catch (exception) {
        log.error("Error in getting peers from quorum" + exception);
        send("Error in getting peers from quorum" + exception);
    }
    return;
}

module.exports = getPeersCount;