'use strict';
import config from '../../config/environment';

var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: config.simplify.publicKey,
        privateKey: config.simplify.privateKey
    });

/**
 * testing base page
 */
export function index(req, res) {
    res.send('base api working!');
}

/**
 * submit a payment
 */
export function submitPayment(req, res) {
    client.payment.create({
        amount : "1000",
        token : "[TOKEN ID]",
        description : "payment description",
        reference : "7a6ef6be31",
        currency : "USD"
    }, function(errData, data){
     
        if(errData){
            console.error("Error Message: " + errData.data.error.message);
            // handle the error
            res.status(500);
            return;
        }
     
        console.log("Payment Status: " + data.paymentStatus);
    });
    res.send('success!');
}
 
