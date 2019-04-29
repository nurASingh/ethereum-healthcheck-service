"use strict";

function getAccountsCount(callback) {
    var peers = web3Http.eth.personal.getAccounts().then(callback);
}

module.exports = getAccountsCount;