'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Chatuser Schema
 */
var ChatuserSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Chatuser name',
		trim: true
	},
    userName: {
        type: String,
        default: '',
        trim: true
    },
    icon: {
        type: String
    },
    bubbleText: {
        type: String
    },
    lastChatTime: {
        type: String
    },
    lastChatMessage: {
        type: String
    },
    docId: {
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

mongoose.model('Chatuser', ChatuserSchema);
