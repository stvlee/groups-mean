'use strict';

//Chatusers service used to communicate Chatusers REST endpoints
angular.module('chatusers').factory('Chatusers', ['$resource',
	function($resource) {
		return $resource('chatusers/:chatuserId', { chatuserId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);