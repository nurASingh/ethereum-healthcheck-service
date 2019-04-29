var express = require('express');
var router = express.Router();
var send = require('../service/email');
var getPeersCount = require('../service/peers');
var getAccountsCount = require('../service/rpc');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
    log.info("Healthcheck");
    try {
        log.info("Get peers count");
        var peers = getPeersCount(function(data, data2) {

            message = "Connected Peers = " + data + "\n";
            log.info(message);
            var accounts = getAccountsCount(function(accountData) {
                message += "Accounts = " + accountData;
                log.info(message);
                if (accountData) {
                    send(message);
                }
            });
        });

    } catch (ex) {
        log.error(ex);
        send(ex);
    }

    res.send('OK');
});

module.exports = router;