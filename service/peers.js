"use strict";

function getPeersCount(callback) {
    var peers = web3Http.eth.net.getPeerCount().then(callback);
}

module.exports = getPeersCount;