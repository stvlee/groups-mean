'use strict';

// Postitems controller
angular.module('postitems').controller('PostitemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Postitems',
	function($scope, $stateParams, $location, Authentication, Postitems) {
		$scope.authentication = Authentication;

		// Create new Postitem
		$scope.create = function() {
			// Create new Postitem object
			var postitem = new Postitems ({
				name: this.name
			});

			// Redirect after save
			postitem.$save(function(response) {
				$location.path('postitems/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Postitem
		$scope.remove = function(postitem) {
			if ( postitem ) { 
				postitem.$remove();

				for (var i in $scope.postitems) {
					if ($scope.postitems [i] === postitem) {
						$scope.postitems.splice(i, 1);
					}
				}
			} else {
				$scope.postitem.$remove(function() {
					$location.path('postitems');
				});
			}
		};

		// Update existing Postitem
		$scope.update = function() {
			var postitem = $scope.postitem;

			postitem.$update(function() {
				$location.path('postitems/' + postitem._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Postitems
		$scope.find = function() {
			$scope.postitems = Postitems.query();
		};

		// Find existing Postitem
		$scope.findOne = function() {
			$scope.postitem = Postitems.get({ 
				postitemId: $stateParams.postitemId
			});
		};
	}
]);