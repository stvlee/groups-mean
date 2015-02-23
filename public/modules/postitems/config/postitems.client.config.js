'use strict';

// Configuring the Articles module
angular.module('postitems').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Postitems', 'postitems', 'dropdown', '/postitems(/create)?');
		Menus.addSubMenuItem('topbar', 'postitems', 'List Postitems', 'postitems');
		Menus.addSubMenuItem('topbar', 'postitems', 'New Postitem', 'postitems/create');
	}
]);