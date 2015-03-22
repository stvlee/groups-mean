'use strict';

//Leftmenus service used to communicate Leftmenus REST endpoints
angular.module('leftmenus').factory('Leftmenus', ['$resource',
	function($resource) {
		return $resource('leftmenus/:leftmenuId', { leftmenuId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);