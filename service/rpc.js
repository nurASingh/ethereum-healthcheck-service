"use strict";
var send = require('./email');

function getAccountsCount(callback) {
    try {
        var peers = web3Http.eth.personal.getAccounts().then(callback);
    } catch (ex) {
        send("Error in RPC call " + ex);
    }
    return;
}

module.exports = getAccountsCount;