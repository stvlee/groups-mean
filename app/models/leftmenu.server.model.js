'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Leftmenu Schema
 */
var LeftmenuSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Leftmenu name',
		trim: true
	},
    icon: {
        type: String
    },
    type: {
        type: String
    },
    method: {
        type: String
    },
    caption: {
        type: String
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Leftmenu', LeftmenuSchema);
