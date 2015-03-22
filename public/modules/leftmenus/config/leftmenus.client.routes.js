'use strict';

//Setting up route
angular.module('leftmenus').config(['$stateProvider',
	function($stateProvider) {
		// Leftmenus state routing
		$stateProvider.
		state('listLeftmenus', {
			url: '/leftmenus',
			templateUrl: 'modules/leftmenus/views/list-leftmenus.client.view.html'
		}).
		state('createLeftmenu', {
			url: '/leftmenus/create',
			templateUrl: 'modules/leftmenus/views/create-leftmenu.client.view.html'
		}).
		state('viewLeftmenu', {
			url: '/leftmenus/:leftmenuId',
			templateUrl: 'modules/leftmenus/views/view-leftmenu.client.view.html'
		}).
		state('editLeftmenu', {
			url: '/leftmenus/:leftmenuId/edit',
			templateUrl: 'modules/leftmenus/views/edit-leftmenu.client.view.html'
		});
	}
]);