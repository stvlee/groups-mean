'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Payment = mongoose.model('Payment'),
    Refund = mongoose.model('Refund'),
    _ = require('lodash');

var request = require('request'),
    parser = require('xml2json');

var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_MGNiNzhkMGEtNzQwOS00NjMxLTlkMGEtZGVmNTc3MDQ1MmNk',
        privateKey: 'IO6mm2j8xX5p7kZh61HaODLcz+D99k28KcvLgMJTT015YFFQL0ODSXAOkNtXTToq'
    });


/**
 * Create a Mastercard
 */
exports.create = function (req, res) {

};

/**
 * Show the current Mastercard
 */
exports.read = function (req, res) {

};

/**
 * Update a Mastercard
 */
exports.update = function (req, res) {

};

/**
 * Delete an Mastercard
 */
exports.delete = function (req, res) {

};

/**
 * List of Mastercards
 */
exports.list = function (req, res) {

};

/**
 * List of ATMS
 */
exports.atms = function (req, res) {

    request('http://dmartin.org:8021/atms/v1/atm?Format=XML&Country=' + req.query.Country + '&PostalCode=' +
        req.query.Postalcode + '&PageOffset=' + req.query.PageOffset + '&PageLength=' + req.query.PageLength, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                //console.log(body)

                var json = parser.toJson(body);
                console.log(json);

                res.send(json);

            } else {

                return res.status(400).send({
                    message: errorHandler.getErrorMessage(error)
                });

            }
        }
    );

};


/**
 * pay
 */
exports.payment = function (req, res) {

    var payment = new Payment(req.body);
    //payment.card = new Card(req.body);
    //post.user = req.user;

    var p = {
        amount : payment.amount,
        description : payment.description,
        card : {
        expMonth : payment.card.expMonth,
            expYear : payment.card.expYear,
            cvc : payment.card.cvc,
            number : payment.card.number
    },
        currency : payment.currency
    };

    console.info(payment);


    client.payment.create(p, function (errData, data) {
            if (errData) {
                //console.error("Error Message: " + errData.data.error.message);
                //// handle the error
                //return;

                return res.status(400).send({
                    message: "Error Message: " + errData.data.error.message
                });
            } else {

                //console.info("called api success:");
                payment.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.jsonp(payment);
                    }
                });

                ////console.log("Payment Status: " + data.paymentStatus);
                //return res.status(200).send({
                //    message: "Payment Status: " + data.paymentStatus
                //});
            }

        }
    );
}


exports.refund = function (req, res) {

    var payment = new Payment(req.body);
    //post.user = req.user;

    client.payment.create({
            amount: payment.amount,
            description: payment.description,
            card: {
                expMonth: payment.card.expMonth,
                expYear: payment.card.expYear,
                cvc: payment.card.cvc,
                number: payment.card.number
            },
            currency: payment.currency
        }, function (errData, data) {
            if (errData) {
                //console.error("Error Message: " + errData.data.error.message);
                //// handle the error
                //return;



                return res.status(400).send({
                    message: "Error Message: " + errData.data.error.message
                });
            } else {

                //set paymentId
                payment.paymentId = data.id;

                payment.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.jsonp(payment);
                    }
                });

                ////console.log("Payment Status: " + data.paymentStatus);
                //return res.status(200).send({
                //    message: "Payment Status: " + data.paymentStatus
                //});
            }

        }
    );
}

