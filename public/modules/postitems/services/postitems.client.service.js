'use strict';

//Postitems service used to communicate Postitems REST endpoints
angular.module('postitems').factory('Postitems', ['$resource',
	function($resource) {
		return $resource('postitems/:postitemId', { postitemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);