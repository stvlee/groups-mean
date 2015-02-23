'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Post name',
		trim: true
	},
    type: {
        type: String,
        default: 'P',
        required: 'Please fill post type',
        trim: true
    },
	content: {
		type: String
	},
    url: {
        type: String
    },
    icon: {
        type: String
    },
    assets: {
        type: Schema.ObjectId,
        ref: 'Asset'
    },
	updated: {
		type: Date
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

mongoose.model('Post', PostSchema);
