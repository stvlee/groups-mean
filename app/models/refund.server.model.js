'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Refund Schema
 */
var RefundSchema = new Schema({
	// Refund model fields   
	// ...
    amount: {
        type: String,
        trim: true,
        default: ''
    },
    paymentId: {
        type: String,
        trim: true,
        default: ''
    },
    reason: {
        type: String,
        trim: true,
        default: ''
    },
    reference: {
        type: String,
        trim: true,
        default: ''
    }
});

mongoose.model('Refund', RefundSchema);
