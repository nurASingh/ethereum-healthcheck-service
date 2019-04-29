"use strict";

var send = require('../service/email');

function pendingTransactionNotification() {

    const subscription = web3Socket.eth.subscribe('pendingTransactions');
    subscription.on("data", function(transaction) {
        var message = "There are pending transaction = " + transaction;
        send(message);
        console.log(transaction);
    });

    subscription.on("error", function(transaction) {
        console.log(transaction);
    });

}
module.exports = pendingTransactionNotification;