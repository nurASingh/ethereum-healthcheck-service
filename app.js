var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');;
var Web3 = require('web3');
var app = express();
var send = require('./service/email');
try {
    web3Http = new Web3(new Web3.providers.HttpProvider('http://10.35.241.251:22000'));
    web3Socket = new Web3(new Web3.providers.WebsocketProvider("ws://10.35.241.251:22005"));
} catch (exception) {
    console.log("Error in Making RPC call ; Quorum node down" + exception);
    send("Error in Making RPC call ; Quorum node down" + exception);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


subscription = web3Socket.eth.subscribe('pendingTransactions');
subscription.on("data", function(transaction) {
    var message = "There are pending transaction = " + transaction;
    send(message);
    console.log(transaction);
});

subscription.on("error", function(transaction) {
    console.log(transaction);
});

process.on('unhandledRejection', (err, p) => {
    send("Error while connecting quorum");
});


module.exports = app;