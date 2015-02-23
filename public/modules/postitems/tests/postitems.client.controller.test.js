'use strict';

(function() {
	// Postitems Controller Spec
	describe('Postitems Controller Tests', function() {
		// Initialize global variables
		var PostitemsController,
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

			// Initialize the Postitems controller.
			PostitemsController = $controller('PostitemsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Postitem object fetched from XHR', inject(function(Postitems) {
			// Create sample Postitem using the Postitems service
			var samplePostitem = new Postitems({
				name: 'New Postitem'
			});

			// Create a sample Postitems array that includes the new Postitem
			var samplePostitems = [samplePostitem];

			// Set GET response
			$httpBackend.expectGET('postitems').respond(samplePostitems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.postitems).toEqualData(samplePostitems);
		}));

		it('$scope.findOne() should create an array with one Postitem object fetched from XHR using a postitemId URL parameter', inject(function(Postitems) {
			// Define a sample Postitem object
			var samplePostitem = new Postitems({
				name: 'New Postitem'
			});

			// Set the URL parameter
			$stateParams.postitemId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/postitems\/([0-9a-fA-F]{24})$/).respond(samplePostitem);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.postitem).toEqualData(samplePostitem);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Postitems) {
			// Create a sample Postitem object
			var samplePostitemPostData = new Postitems({
				name: 'New Postitem'
			});

			// Create a sample Postitem response
			var samplePostitemResponse = new Postitems({
				_id: '525cf20451979dea2c000001',
				name: 'New Postitem'
			});

			// Fixture mock form input values
			scope.name = 'New Postitem';

			// Set POST response
			$httpBackend.expectPOST('postitems', samplePostitemPostData).respond(samplePostitemResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Postitem was created
			expect($location.path()).toBe('/postitems/' + samplePostitemResponse._id);
		}));

		it('$scope.update() should update a valid Postitem', inject(function(Postitems) {
			// Define a sample Postitem put data
			var samplePostitemPutData = new Postitems({
				_id: '525cf20451979dea2c000001',
				name: 'New Postitem'
			});

			// Mock Postitem in scope
			scope.postitem = samplePostitemPutData;

			// Set PUT response
			$httpBackend.expectPUT(/postitems\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/postitems/' + samplePostitemPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid postitemId and remove the Postitem from the scope', inject(function(Postitems) {
			// Create new Postitem object
			var samplePostitem = new Postitems({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Postitems array and include the Postitem
			scope.postitems = [samplePostitem];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/postitems\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePostitem);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.postitems.length).toBe(0);
		}));
	});
}());