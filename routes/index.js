var express = require('express');
//var Web3 = require('web3')
var router = express.Router();

var send = require('../service/email');
var getPeersCount = require('../service/peers');
var getAccountsCount = require('../service/rpc');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
    try {
        var peers = getPeersCount(function(data, data2) {
            message = "Connected Peers = " + data + data2 + "\n";
            var accounts = getAccountsCount(function(accountData) {
                message += "Accounts = " + accountData;
                if (accountData) {
                    send(message);
                }
            });
        });

    } catch (ex) {
        send(ex);
    }

    res.send('OK');
});

module.exports = router;