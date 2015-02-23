'use strict';

// Configuring the Articles module
angular.module('threads').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Threads', 'threads', 'dropdown', '/threads(/create)?');
		Menus.addSubMenuItem('topbar', 'threads', 'List Threads', 'threads');
		Menus.addSubMenuItem('topbar', 'threads', 'New Thread', 'threads/create');
	}
]);