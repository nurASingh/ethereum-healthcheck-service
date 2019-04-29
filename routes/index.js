var express = require('express');
var Web3 = require('web3')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://3.94.188.142:22000'));
    const web3Provider = new Web3(new Web3.providers.WebsocketProvider("ws://3.94.188.142:22005"));
    console.log(web3.eth.net.getPeerCount().then(console.log));
    //console.log(web3Provider);

    //web3.eth.getBlock('pending');
    web3.eth.isSyncing(function(err, data) {
        console.log(err + '==' + data);
    });
    web3.eth.isMining(function(err, data) {
        console.log(err + '==' + data);
    });
    web3.eth.getNodeInfo(function(err, data) {
        console.log(err + '==' + data);
    });

    const subscription = web3Provider.eth.subscribe('pendingTransactions');
    subscription.on("data", function(transaction) {
        console.log(transaction);
    });

    subscription.on("error", function(transaction) {
        console.log(transaction);
    });





    res.render('index', { title: 'Express' });
});

module.exports = router;