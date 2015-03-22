'use strict';

(function() {
	// Leftmenus Controller Spec
	describe('Leftmenus Controller Tests', function() {
		// Initialize global variables
		var LeftmenusController,
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

			// Initialize the Leftmenus controller.
			LeftmenusController = $controller('LeftmenusController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Leftmenu object fetched from XHR', inject(function(Leftmenus) {
			// Create sample Leftmenu using the Leftmenus service
			var sampleLeftmenu = new Leftmenus({
				name: 'New Leftmenu'
			});

			// Create a sample Leftmenus array that includes the new Leftmenu
			var sampleLeftmenus = [sampleLeftmenu];

			// Set GET response
			$httpBackend.expectGET('leftmenus').respond(sampleLeftmenus);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.leftmenus).toEqualData(sampleLeftmenus);
		}));

		it('$scope.findOne() should create an array with one Leftmenu object fetched from XHR using a leftmenuId URL parameter', inject(function(Leftmenus) {
			// Define a sample Leftmenu object
			var sampleLeftmenu = new Leftmenus({
				name: 'New Leftmenu'
			});

			// Set the URL parameter
			$stateParams.leftmenuId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/leftmenus\/([0-9a-fA-F]{24})$/).respond(sampleLeftmenu);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.leftmenu).toEqualData(sampleLeftmenu);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Leftmenus) {
			// Create a sample Leftmenu object
			var sampleLeftmenuPostData = new Leftmenus({
				name: 'New Leftmenu'
			});

			// Create a sample Leftmenu response
			var sampleLeftmenuResponse = new Leftmenus({
				_id: '525cf20451979dea2c000001',
				name: 'New Leftmenu'
			});

			// Fixture mock form input values
			scope.name = 'New Leftmenu';

			// Set POST response
			$httpBackend.expectPOST('leftmenus', sampleLeftmenuPostData).respond(sampleLeftmenuResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Leftmenu was created
			expect($location.path()).toBe('/leftmenus/' + sampleLeftmenuResponse._id);
		}));

		it('$scope.update() should update a valid Leftmenu', inject(function(Leftmenus) {
			// Define a sample Leftmenu put data
			var sampleLeftmenuPutData = new Leftmenus({
				_id: '525cf20451979dea2c000001',
				name: 'New Leftmenu'
			});

			// Mock Leftmenu in scope
			scope.leftmenu = sampleLeftmenuPutData;

			// Set PUT response
			$httpBackend.expectPUT(/leftmenus\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/leftmenus/' + sampleLeftmenuPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid leftmenuId and remove the Leftmenu from the scope', inject(function(Leftmenus) {
			// Create new Leftmenu object
			var sampleLeftmenu = new Leftmenus({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Leftmenus array and include the Leftmenu
			scope.leftmenus = [sampleLeftmenu];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/leftmenus\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLeftmenu);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.leftmenus.length).toBe(0);
		}));
	});
}());