'use strict';

(function() {
	// Attachments Controller Spec
	describe('Attachments Controller Tests', function() {
		// Initialize global variables
		var AttachmentsController,
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

			// Initialize the Attachments controller.
			AttachmentsController = $controller('AttachmentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Attachment object fetched from XHR', inject(function(Attachments) {
			// Create sample Attachment using the Attachments service
			var sampleAttachment = new Attachments({
				name: 'New Attachment'
			});

			// Create a sample Attachments array that includes the new Attachment
			var sampleAttachments = [sampleAttachment];

			// Set GET response
			$httpBackend.expectGET('attachments').respond(sampleAttachments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.attachments).toEqualData(sampleAttachments);
		}));

		it('$scope.findOne() should create an array with one Attachment object fetched from XHR using a attachmentId URL parameter', inject(function(Attachments) {
			// Define a sample Attachment object
			var sampleAttachment = new Attachments({
				name: 'New Attachment'
			});

			// Set the URL parameter
			$stateParams.attachmentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/attachments\/([0-9a-fA-F]{24})$/).respond(sampleAttachment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.attachment).toEqualData(sampleAttachment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Attachments) {
			// Create a sample Attachment object
			var sampleAttachmentPostData = new Attachments({
				name: 'New Attachment'
			});

			// Create a sample Attachment response
			var sampleAttachmentResponse = new Attachments({
				_id: '525cf20451979dea2c000001',
				name: 'New Attachment'
			});

			// Fixture mock form input values
			scope.name = 'New Attachment';

			// Set POST response
			$httpBackend.expectPOST('attachments', sampleAttachmentPostData).respond(sampleAttachmentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Attachment was created
			expect($location.path()).toBe('/attachments/' + sampleAttachmentResponse._id);
		}));

		it('$scope.update() should update a valid Attachment', inject(function(Attachments) {
			// Define a sample Attachment put data
			var sampleAttachmentPutData = new Attachments({
				_id: '525cf20451979dea2c000001',
				name: 'New Attachment'
			});

			// Mock Attachment in scope
			scope.attachment = sampleAttachmentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/attachments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/attachments/' + sampleAttachmentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid attachmentId and remove the Attachment from the scope', inject(function(Attachments) {
			// Create new Attachment object
			var sampleAttachment = new Attachments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Attachments array and include the Attachment
			scope.attachments = [sampleAttachment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/attachments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAttachment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.attachments.length).toBe(0);
		}));
	});
}());