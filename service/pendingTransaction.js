"use strict";

function pendingTransactionNotification() {

    const subscription = web3Provider.eth.subscribe('pendingTransactions');
    subscription.on("data", function(transaction) {
        console.log(transaction);
    });

    subscription.on("error", function(transaction) {
        console.log(transaction);
    });

}
module.exports = pendingTransactionNotification;