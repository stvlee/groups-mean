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
    /**
    thread: {
        type: Schema.ObjectId,
        ref: 'Thread'
    },
    forum: {
        type: Schema.ObjectId,
        ref: 'Forum'
    },**/
    //subject
    name: {
        type: String,
        default: '',
        required: 'Please fill Post name',
        trim: true
    },
    description: {
        type: String
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
    position: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        trim: true
    },
    iconUrl: {
        type: String,
        trim: true
    },
    items: {
        type: Schema.ObjectId,
        ref: 'Postitem'
    },
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    //author
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Post', PostSchema);
