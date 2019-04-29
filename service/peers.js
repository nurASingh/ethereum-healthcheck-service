"use strict";
var send = require('./email');

function getPeersCount(callback) {
    try {
        console.log("getPeersCount ");
        var peers = web3Http.eth.net.getPeerCount().then(callback);
    } catch (exception) {
        send("Error in getting peers from quorum" + exception);
    }
    return;
}

module.exports = getPeersCount;