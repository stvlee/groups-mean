'use strict';

// Configuring the Articles module
angular.module('chatusers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Chatusers', 'chatusers', 'dropdown', '/chatusers(/create)?');
		Menus.addSubMenuItem('topbar', 'chatusers', 'List Chatusers', 'chatusers');
		Menus.addSubMenuItem('topbar', 'chatusers', 'New Chatuser', 'chatusers/create');
	}
]);