'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var leftmenus = require('../../app/controllers/leftmenus.server.controller');

	// Leftmenus Routes
	app.route('/leftmenus')
		.get(leftmenus.list)
		.post(users.requiresLogin, leftmenus.create);

	app.route('/leftmenus/:leftmenuId')
		.get(leftmenus.read)
		.put(users.requiresLogin, leftmenus.hasAuthorization, leftmenus.update)
		.delete(users.requiresLogin, leftmenus.hasAuthorization, leftmenus.delete);


    //clean all
    app.route('/leftmenu/clean/')
        .get(leftmenus.clean);


	// Finish by binding the Leftmenu middleware
	app.param('leftmenuId', leftmenus.leftmenuByID);
};
