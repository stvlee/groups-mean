'use strict';

//Setting up route
angular.module('attachments').config(['$stateProvider',
	function($stateProvider) {
		// Attachments state routing
		$stateProvider.
		state('listAttachments', {
			url: '/attachments',
			templateUrl: 'modules/attachments/views/list-attachments.client.view.html'
		}).
		state('createAttachment', {
			url: '/attachments/create',
			templateUrl: 'modules/attachments/views/create-attachment.client.view.html'
		}).
		state('viewAttachment', {
			url: '/attachments/:attachmentId',
			templateUrl: 'modules/attachments/views/view-attachment.client.view.html'
		}).
		state('editAttachment', {
			url: '/attachments/:attachmentId/edit',
			templateUrl: 'modules/attachments/views/edit-attachment.client.view.html'
		});
	}
]);