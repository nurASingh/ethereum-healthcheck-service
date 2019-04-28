var express = require('express');
var Web3 = require('web3')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
  const web3  = new Web3(new Web3.providers.HttpProvider('http://3.94.188.142:22000'));
  
  const web3Provider = new Web3(new Web3.providers.WebsocketProvider("ws://3.94.188.142:22000"));
    console.log(web3.eth.net.getPeerCount().then(console.log));
    //console.log(web3.eth.getPendingTransactions());
    
  const subscription = web3Provider.eth.subscribe('pendingTransactions').then(console.log);
  subscription.on("data", function(transaction){
      console.log(transaction);
  });


  const subscription2 = web3Provider.eth.subscribe('newBlockHeaders', function(error, result){
      if (!error) {
          console.log(result);

          return;
      }

      console.error(error);
  })
  .on("data", function(blockHeader){
      console.log(blockHeader);
  })
  .on("error", console.error);

  res.render('index', { title: 'Express' });
});

module.exports = router;
