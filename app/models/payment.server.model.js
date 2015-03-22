'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Payment Schema
 */
var PaymentSchema = new Schema({
	// Payment model fields   
	// ...
    paymentId: {
        type: String
    },
    amount: {
        type: String,
        trim: true,
        default: ''
    },
    token: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    reference: {
        type: String,
        trim: true,
        default: ''
    },
    currency: {
        type: String,
        trim: true,
        default: ''
    },
    card: {
        number: {
            type: String,
            trim: true,
            default: ''
        },
        cvc: {
            type: String,
            trim: true,
            default: ''
        },
        expMonth: {
            type: String,
            trim: true,
            default: ''
        },
        expYear: {
            type: String,
            trim: true,
            default: ''
        }
    }

});

mongoose.model('Payment', PaymentSchema);
