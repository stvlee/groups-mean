'use strict';

// Leftmenus controller
angular.module('leftmenus').controller('LeftmenusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Leftmenus',
	function($scope, $stateParams, $location, Authentication, Leftmenus) {
		$scope.authentication = Authentication;

		// Create new Leftmenu
		$scope.create = function() {
			// Create new Leftmenu object
			var leftmenu = new Leftmenus ({
				name: this.name,
                icon: this.icon,
                type: this.type,
                method: this.method,
                caption: this.caption
			});

			// Redirect after save
			leftmenu.$save(function(response) {
				$location.path('leftmenus/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Leftmenu
		$scope.remove = function(leftmenu) {
			if ( leftmenu ) { 
				leftmenu.$remove();

				for (var i in $scope.leftmenus) {
					if ($scope.leftmenus [i] === leftmenu) {
						$scope.leftmenus.splice(i, 1);
					}
				}
			} else {
				$scope.leftmenu.$remove(function() {
					$location.path('leftmenus');
				});
			}
		};

		// Update existing Leftmenu
		$scope.update = function() {
			var leftmenu = $scope.leftmenu;

			leftmenu.$update(function() {
				$location.path('leftmenus/' + leftmenu._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Leftmenus
		$scope.find = function() {
			$scope.leftmenus = Leftmenus.query();
		};

		// Find existing Leftmenu
		$scope.findOne = function() {
			$scope.leftmenu = Leftmenus.get({ 
				leftmenuId: $stateParams.leftmenuId
			});
		};
	}
]);
