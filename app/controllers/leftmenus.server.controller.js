'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Leftmenu = mongoose.model('Leftmenu'),
	_ = require('lodash');

/**
 * Create a Leftmenu
 */
exports.create = function(req, res) {
	var leftmenu = new Leftmenu(req.body);
    console.info(req.body);

	leftmenu.user = req.user;

	leftmenu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leftmenu);
		}
	});
};

/**
 * Show the current Leftmenu
 */
exports.read = function(req, res) {
	res.jsonp(req.leftmenu);
};

/**
 * Update a Leftmenu
 */
exports.update = function(req, res) {
	var leftmenu = req.leftmenu ;

	leftmenu = _.extend(leftmenu , req.body);

	leftmenu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leftmenu);
		}
	});
};

/**
 * Delete an Leftmenu
 */
exports.delete = function(req, res) {
	var leftmenu = req.leftmenu ;

	leftmenu.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leftmenu);
		}
	});
};

/**
 * List of Leftmenus
 */
exports.list = function(req, res) { 
	Leftmenu.find().sort('-created').populate('user', 'displayName').exec(function(err, leftmenus) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leftmenus);
		}
	});
};

/**
 * Leftmenu middleware
 */
exports.leftmenuByID = function(req, res, next, id) { 
	Leftmenu.findById(id).populate('user', 'displayName').exec(function(err, leftmenu) {
		if (err) return next(err);
		if (! leftmenu) return next(new Error('Failed to load Leftmenu ' + id));
		req.leftmenu = leftmenu ;
		next();
	});
};

/**
 * Leftmenu authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.leftmenu.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
