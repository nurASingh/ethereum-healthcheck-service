"use strict";
var request = require("request");

var exec = require('child_process').exec;


var body = "Test";

function sendEmail(token) {
    log.info("Sending email notification........");
    var auth = 'bearer ' + token.toString();
    var options = {
        method: 'POST',
        url: 'https://notifications.svcs.mdevlab.com/api/notification-router/notification',
        headers: {
            'postman-token': '592651d8-7942-3ebe-c708-480046d69238',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            authorization: auth
        },
        body: {
            service: 'batchtradeprocessor',
            tag: 'stax',
            providers: [{
                type: 'mail',
                style: 'sync',
                persist: true,
                details: {
                    to: 'arunkumar.singh2@markit.com;',
                    "attachments": ["../../../reports/generatedReport.html"],
                    subject: 'Quorum Heacheck Notification',
                    body: body,
                    from: 'MK-MCPNotification@ihsmarkit.com'
                }
            }],
            meta: {
                username: 'bob',
                fullname: 'Bob Ross',
                batchId: '34276',
                batchStatus: 'Complete',
                uploadTime: '5'
            }
        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
}

function getToken(callback) {
    exec('java -jar JavaToken-1.0-SNAPSHOT-jar-with-dependencies.jar', function(error, stdout) {
        if (!error) {
            callback(stdout);
        } else {
            console.log("Error in getting token");
        }
    });
}

function send(message) {
    if (!message) {
        body = "Test Case failed";
    } else {
        body = message;
    }
    getToken(sendEmail);
}

module.exports = send