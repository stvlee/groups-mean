'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Chatuser = mongoose.model('Chatuser'),
	_ = require('lodash');

/**
 * Create a Chatuser
 */
exports.create = function(req, res) {
	var chatuser = new Chatuser(req.body);
	chatuser.user = req.user;

	chatuser.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(chatuser);
		}
	});
};

/**
 * Show the current Chatuser
 */
exports.read = function(req, res) {
	res.jsonp(req.chatuser);
};

/**
 * Update a Chatuser
 */
exports.update = function(req, res) {
	var chatuser = req.chatuser ;

	chatuser = _.extend(chatuser , req.body);

	chatuser.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(chatuser);
		}
	});
};

/**
 * Delete an Chatuser
 */
exports.delete = function(req, res) {
	var chatuser = req.chatuser ;

	chatuser.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(chatuser);
		}
	});
};

/**
 * Clean
 */
exports.clean = function(req, res) {
    Chatuser.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.send('<p>clean finished</p>');
        }
    });
};

/**
 * List of Chatusers
 */
exports.list = function(req, res) { 
	Chatuser.find().sort('-created').populate('user', 'displayName').exec(function(err, chatusers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(chatusers);
		}
	});
};

/**
 * Chatuser middleware
 */
exports.chatuserByID = function(req, res, next, id) { 
	Chatuser.findById(id).populate('user', 'displayName').exec(function(err, chatuser) {
		if (err) return next(err);
		if (! chatuser) return next(new Error('Failed to load Chatuser ' + id));
		req.chatuser = chatuser ;
		next();
	});
};

/**
 * Chatuser authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.chatuser.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
