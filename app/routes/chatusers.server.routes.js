'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var chatusers = require('../../app/controllers/chatusers.server.controller');

	// Chatusers Routes
	app.route('/chatusers')
		.get(chatusers.list)
		.post(users.requiresLogin, chatusers.create);

	app.route('/chatusers/:chatuserId')
		.get(chatusers.read)
		.put(users.requiresLogin, chatusers.hasAuthorization, chatusers.update)
		.delete(users.requiresLogin, chatusers.hasAuthorization, chatusers.delete);


    //clean all
    app.route('/chatuserclean/')
        .get(chatusers.clean);

	// Finish by binding the Chatuser middleware
	app.param('chatuserId', chatusers.chatuserByID);
};
