"use strict";

function getPeersCount() {
    var peers = web3.eth.net.getPeerCount().then(console.log);
    console.log(peers);
    return peers;
}

module.exports = getPeersCount;