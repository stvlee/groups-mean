'use strict';

(function() {
	// Chatusers Controller Spec
	describe('Chatusers Controller Tests', function() {
		// Initialize global variables
		var ChatusersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Chatusers controller.
			ChatusersController = $controller('ChatusersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Chatuser object fetched from XHR', inject(function(Chatusers) {
			// Create sample Chatuser using the Chatusers service
			var sampleChatuser = new Chatusers({
				name: 'New Chatuser'
			});

			// Create a sample Chatusers array that includes the new Chatuser
			var sampleChatusers = [sampleChatuser];

			// Set GET response
			$httpBackend.expectGET('chatusers').respond(sampleChatusers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.chatusers).toEqualData(sampleChatusers);
		}));

		it('$scope.findOne() should create an array with one Chatuser object fetched from XHR using a chatuserId URL parameter', inject(function(Chatusers) {
			// Define a sample Chatuser object
			var sampleChatuser = new Chatusers({
				name: 'New Chatuser'
			});

			// Set the URL parameter
			$stateParams.chatuserId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/chatusers\/([0-9a-fA-F]{24})$/).respond(sampleChatuser);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.chatuser).toEqualData(sampleChatuser);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Chatusers) {
			// Create a sample Chatuser object
			var sampleChatuserPostData = new Chatusers({
				name: 'New Chatuser'
			});

			// Create a sample Chatuser response
			var sampleChatuserResponse = new Chatusers({
				_id: '525cf20451979dea2c000001',
				name: 'New Chatuser'
			});

			// Fixture mock form input values
			scope.name = 'New Chatuser';

			// Set POST response
			$httpBackend.expectPOST('chatusers', sampleChatuserPostData).respond(sampleChatuserResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Chatuser was created
			expect($location.path()).toBe('/chatusers/' + sampleChatuserResponse._id);
		}));

		it('$scope.update() should update a valid Chatuser', inject(function(Chatusers) {
			// Define a sample Chatuser put data
			var sampleChatuserPutData = new Chatusers({
				_id: '525cf20451979dea2c000001',
				name: 'New Chatuser'
			});

			// Mock Chatuser in scope
			scope.chatuser = sampleChatuserPutData;

			// Set PUT response
			$httpBackend.expectPUT(/chatusers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/chatusers/' + sampleChatuserPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid chatuserId and remove the Chatuser from the scope', inject(function(Chatusers) {
			// Create new Chatuser object
			var sampleChatuser = new Chatusers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Chatusers array and include the Chatuser
			scope.chatusers = [sampleChatuser];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/chatusers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleChatuser);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.chatusers.length).toBe(0);
		}));
	});
}());