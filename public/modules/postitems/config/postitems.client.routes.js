'use strict';

//Setting up route
angular.module('postitems').config(['$stateProvider',
	function($stateProvider) {
		// Postitems state routing
		$stateProvider.
		state('listPostitems', {
			url: '/postitems',
			templateUrl: 'modules/postitems/views/list-postitems.client.view.html'
		}).
		state('createPostitem', {
			url: '/postitems/create',
			templateUrl: 'modules/postitems/views/create-postitem.client.view.html'
		}).
		state('viewPostitem', {
			url: '/postitems/:postitemId',
			templateUrl: 'modules/postitems/views/view-postitem.client.view.html'
		}).
		state('editPostitem', {
			url: '/postitems/:postitemId/edit',
			templateUrl: 'modules/postitems/views/edit-postitem.client.view.html'
		});
	}
]);