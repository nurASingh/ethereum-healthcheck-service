"use strict";
var send = require('./email');

function getAccountsCount(callback) {
    try {
        log.info("Getting accounts");
        var peers = web3Http.eth.personal.getAccounts().then(callback);
    } catch (ex) {
        log.error("Error in RPC call " + ex);
        send("Error in RPC call " + ex);
    }
    return;
}

module.exports = getAccountsCount;