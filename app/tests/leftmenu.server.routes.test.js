'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Leftmenu = mongoose.model('Leftmenu'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, leftmenu;

/**
 * Leftmenu routes tests
 */
describe('Leftmenu CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Leftmenu
		user.save(function() {
			leftmenu = {
				name: 'Leftmenu Name'
			};

			done();
		});
	});

	it('should be able to save Leftmenu instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leftmenu
				agent.post('/leftmenus')
					.send(leftmenu)
					.expect(200)
					.end(function(leftmenuSaveErr, leftmenuSaveRes) {
						// Handle Leftmenu save error
						if (leftmenuSaveErr) done(leftmenuSaveErr);

						// Get a list of Leftmenus
						agent.get('/leftmenus')
							.end(function(leftmenusGetErr, leftmenusGetRes) {
								// Handle Leftmenu save error
								if (leftmenusGetErr) done(leftmenusGetErr);

								// Get Leftmenus list
								var leftmenus = leftmenusGetRes.body;

								// Set assertions
								(leftmenus[0].user._id).should.equal(userId);
								(leftmenus[0].name).should.match('Leftmenu Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Leftmenu instance if not logged in', function(done) {
		agent.post('/leftmenus')
			.send(leftmenu)
			.expect(401)
			.end(function(leftmenuSaveErr, leftmenuSaveRes) {
				// Call the assertion callback
				done(leftmenuSaveErr);
			});
	});

	it('should not be able to save Leftmenu instance if no name is provided', function(done) {
		// Invalidate name field
		leftmenu.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leftmenu
				agent.post('/leftmenus')
					.send(leftmenu)
					.expect(400)
					.end(function(leftmenuSaveErr, leftmenuSaveRes) {
						// Set message assertion
						(leftmenuSaveRes.body.message).should.match('Please fill Leftmenu name');
						
						// Handle Leftmenu save error
						done(leftmenuSaveErr);
					});
			});
	});

	it('should be able to update Leftmenu instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leftmenu
				agent.post('/leftmenus')
					.send(leftmenu)
					.expect(200)
					.end(function(leftmenuSaveErr, leftmenuSaveRes) {
						// Handle Leftmenu save error
						if (leftmenuSaveErr) done(leftmenuSaveErr);

						// Update Leftmenu name
						leftmenu.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Leftmenu
						agent.put('/leftmenus/' + leftmenuSaveRes.body._id)
							.send(leftmenu)
							.expect(200)
							.end(function(leftmenuUpdateErr, leftmenuUpdateRes) {
								// Handle Leftmenu update error
								if (leftmenuUpdateErr) done(leftmenuUpdateErr);

								// Set assertions
								(leftmenuUpdateRes.body._id).should.equal(leftmenuSaveRes.body._id);
								(leftmenuUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Leftmenus if not signed in', function(done) {
		// Create new Leftmenu model instance
		var leftmenuObj = new Leftmenu(leftmenu);

		// Save the Leftmenu
		leftmenuObj.save(function() {
			// Request Leftmenus
			request(app).get('/leftmenus')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Leftmenu if not signed in', function(done) {
		// Create new Leftmenu model instance
		var leftmenuObj = new Leftmenu(leftmenu);

		// Save the Leftmenu
		leftmenuObj.save(function() {
			request(app).get('/leftmenus/' + leftmenuObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', leftmenu.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Leftmenu instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leftmenu
				agent.post('/leftmenus')
					.send(leftmenu)
					.expect(200)
					.end(function(leftmenuSaveErr, leftmenuSaveRes) {
						// Handle Leftmenu save error
						if (leftmenuSaveErr) done(leftmenuSaveErr);

						// Delete existing Leftmenu
						agent.delete('/leftmenus/' + leftmenuSaveRes.body._id)
							.send(leftmenu)
							.expect(200)
							.end(function(leftmenuDeleteErr, leftmenuDeleteRes) {
								// Handle Leftmenu error error
								if (leftmenuDeleteErr) done(leftmenuDeleteErr);

								// Set assertions
								(leftmenuDeleteRes.body._id).should.equal(leftmenuSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Leftmenu instance if not signed in', function(done) {
		// Set Leftmenu user 
		leftmenu.user = user;

		// Create new Leftmenu model instance
		var leftmenuObj = new Leftmenu(leftmenu);

		// Save the Leftmenu
		leftmenuObj.save(function() {
			// Try deleting Leftmenu
			request(app).delete('/leftmenus/' + leftmenuObj._id)
			.expect(401)
			.end(function(leftmenuDeleteErr, leftmenuDeleteRes) {
				// Set message assertion
				(leftmenuDeleteRes.body.message).should.match('User is not logged in');

				// Handle Leftmenu error error
				done(leftmenuDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Leftmenu.remove().exec();
		done();
	});
});