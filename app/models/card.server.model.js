'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Card Schema
 */
var CardSchema = new Schema({
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
});

mongoose.model('Card', CardSchema);
