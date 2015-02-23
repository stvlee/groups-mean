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
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Post', PostSchema);
