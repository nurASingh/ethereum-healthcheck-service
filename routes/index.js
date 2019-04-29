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
    var peers = getPeersCount(function(data) {
        message = "Connected Peers = " + data + "\n";
        var accounts = getAccountsCount(function(data1) {
            message += "Accounts = " + data1;
            if (data1) {
                send(message);
            }
        });

    });


    res.render('index', { title: 'Express' });
});

module.exports = router;