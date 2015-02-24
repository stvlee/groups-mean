'use strict';

// Attachments controller
angular.module('attachments').controller('AttachmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Attachments',
	function($scope, $stateParams, $location, Authentication, Attachments) {
		$scope.authentication = Authentication;

		// Create new Attachment
		$scope.create = function() {
			// Create new Attachment object
			var attachment = new Attachments ({
				name: this.name
			});

			// Redirect after save
			attachment.$save(function(response) {
				$location.path('attachments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Attachment
		$scope.remove = function(attachment) {
			if ( attachment ) { 
				attachment.$remove();

				for (var i in $scope.attachments) {
					if ($scope.attachments [i] === attachment) {
						$scope.attachments.splice(i, 1);
					}
				}
			} else {
				$scope.attachment.$remove(function() {
					$location.path('attachments');
				});
			}
		};

		// Update existing Attachment
		$scope.update = function() {
			var attachment = $scope.attachment;

			attachment.$update(function() {
				$location.path('attachments/' + attachment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Attachments
		$scope.find = function() {
			$scope.attachments = Attachments.query();
		};

		// Find existing Attachment
		$scope.findOne = function() {
			$scope.attachment = Attachments.get({ 
				attachmentId: $stateParams.attachmentId
			});
		};
	}
]);