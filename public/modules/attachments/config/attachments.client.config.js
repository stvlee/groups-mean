'use strict';

// Configuring the Articles module
angular.module('attachments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Attachments', 'attachments', 'dropdown', '/attachments(/create)?');
		Menus.addSubMenuItem('topbar', 'attachments', 'List Attachments', 'attachments');
		Menus.addSubMenuItem('topbar', 'attachments', 'New Attachment', 'attachments/create');
	}
]);