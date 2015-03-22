'use strict';

// Chatusers controller
angular.module('chatusers').controller('ChatusersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Chatusers',
    function ($scope, $stateParams, $location, Authentication, Chatusers) {
        $scope.authentication = Authentication;

        // Create new Chatuser
        $scope.create = function () {
            // Create new Chatuser object
            var chatuser = new Chatusers({
                name: this.name,
                userName: this.userName,
                icon: this.icon,
                bubbleText: this.bubbleText,
                lastChatTime: this.lastChatTime,
                lastChatMessage: this.lastChatMessage,
                docId: this.docId
            });

            // Redirect after save
            chatuser.$save(function (response) {
                $location.path('chatusers/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Chatuser
        $scope.remove = function (chatuser) {
            if (chatuser) {
                chatuser.$remove();

                for (var i in $scope.chatusers) {
                    if ($scope.chatusers [i] === chatuser) {
                        $scope.chatusers.splice(i, 1);
                    }
                }
            } else {
                $scope.chatuser.$remove(function () {
                    $location.path('chatusers');
                });
            }
        };

        // Update existing Chatuser
        $scope.update = function () {
            var chatuser = $scope.chatuser;

            chatuser.$update(function () {
                $location.path('chatusers/' + chatuser._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Chatusers
        $scope.find = function () {
            $scope.chatusers = Chatusers.query();
        };

        // Find existing Chatuser
        $scope.findOne = function () {
            $scope.chatuser = Chatusers.get({
                chatuserId: $stateParams.chatuserId
            });
        };
    }
]);
