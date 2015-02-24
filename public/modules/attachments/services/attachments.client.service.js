'use strict';

//Attachments service used to communicate Attachments REST endpoints
angular.module('attachments').factory('Attachments', ['$resource',
	function($resource) {
		return $resource('attachments/:attachmentId', { attachmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);