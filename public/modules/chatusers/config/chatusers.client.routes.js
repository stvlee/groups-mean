'use strict';

//Setting up route
angular.module('chatusers').config(['$stateProvider',
	function($stateProvider) {
		// Chatusers state routing
		$stateProvider.
		state('listChatusers', {
			url: '/chatusers',
			templateUrl: 'modules/chatusers/views/list-chatusers.client.view.html'
		}).
		state('createChatuser', {
			url: '/chatusers/create',
			templateUrl: 'modules/chatusers/views/create-chatuser.client.view.html'
		}).
		state('viewChatuser', {
			url: '/chatusers/:chatuserId',
			templateUrl: 'modules/chatusers/views/view-chatuser.client.view.html'
		}).
		state('editChatuser', {
			url: '/chatusers/:chatuserId/edit',
			templateUrl: 'modules/chatusers/views/edit-chatuser.client.view.html'
		});
	}
]);