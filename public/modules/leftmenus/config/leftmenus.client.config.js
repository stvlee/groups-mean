'use strict';

// Configuring the Articles module
angular.module('leftmenus').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Leftmenus', 'leftmenus', 'dropdown', '/leftmenus(/create)?');
		Menus.addSubMenuItem('topbar', 'leftmenus', 'List Leftmenus', 'leftmenus');
		Menus.addSubMenuItem('topbar', 'leftmenus', 'New Leftmenu', 'leftmenus/create');
	}
]);