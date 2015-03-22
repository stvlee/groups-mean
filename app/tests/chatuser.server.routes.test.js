'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Chatuser = mongoose.model('Chatuser'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, chatuser;

/**
 * Chatuser routes tests
 */
describe('Chatuser CRUD tests', function() {
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

		// Save a user to the test db and create new Chatuser
		user.save(function() {
			chatuser = {
				name: 'Chatuser Name'
			};

			done();
		});
	});

	it('should be able to save Chatuser instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chatuser
				agent.post('/chatusers')
					.send(chatuser)
					.expect(200)
					.end(function(chatuserSaveErr, chatuserSaveRes) {
						// Handle Chatuser save error
						if (chatuserSaveErr) done(chatuserSaveErr);

						// Get a list of Chatusers
						agent.get('/chatusers')
							.end(function(chatusersGetErr, chatusersGetRes) {
								// Handle Chatuser save error
								if (chatusersGetErr) done(chatusersGetErr);

								// Get Chatusers list
								var chatusers = chatusersGetRes.body;

								// Set assertions
								(chatusers[0].user._id).should.equal(userId);
								(chatusers[0].name).should.match('Chatuser Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Chatuser instance if not logged in', function(done) {
		agent.post('/chatusers')
			.send(chatuser)
			.expect(401)
			.end(function(chatuserSaveErr, chatuserSaveRes) {
				// Call the assertion callback
				done(chatuserSaveErr);
			});
	});

	it('should not be able to save Chatuser instance if no name is provided', function(done) {
		// Invalidate name field
		chatuser.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chatuser
				agent.post('/chatusers')
					.send(chatuser)
					.expect(400)
					.end(function(chatuserSaveErr, chatuserSaveRes) {
						// Set message assertion
						(chatuserSaveRes.body.message).should.match('Please fill Chatuser name');
						
						// Handle Chatuser save error
						done(chatuserSaveErr);
					});
			});
	});

	it('should be able to update Chatuser instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chatuser
				agent.post('/chatusers')
					.send(chatuser)
					.expect(200)
					.end(function(chatuserSaveErr, chatuserSaveRes) {
						// Handle Chatuser save error
						if (chatuserSaveErr) done(chatuserSaveErr);

						// Update Chatuser name
						chatuser.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Chatuser
						agent.put('/chatusers/' + chatuserSaveRes.body._id)
							.send(chatuser)
							.expect(200)
							.end(function(chatuserUpdateErr, chatuserUpdateRes) {
								// Handle Chatuser update error
								if (chatuserUpdateErr) done(chatuserUpdateErr);

								// Set assertions
								(chatuserUpdateRes.body._id).should.equal(chatuserSaveRes.body._id);
								(chatuserUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Chatusers if not signed in', function(done) {
		// Create new Chatuser model instance
		var chatuserObj = new Chatuser(chatuser);

		// Save the Chatuser
		chatuserObj.save(function() {
			// Request Chatusers
			request(app).get('/chatusers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Chatuser if not signed in', function(done) {
		// Create new Chatuser model instance
		var chatuserObj = new Chatuser(chatuser);

		// Save the Chatuser
		chatuserObj.save(function() {
			request(app).get('/chatusers/' + chatuserObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', chatuser.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Chatuser instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chatuser
				agent.post('/chatusers')
					.send(chatuser)
					.expect(200)
					.end(function(chatuserSaveErr, chatuserSaveRes) {
						// Handle Chatuser save error
						if (chatuserSaveErr) done(chatuserSaveErr);

						// Delete existing Chatuser
						agent.delete('/chatusers/' + chatuserSaveRes.body._id)
							.send(chatuser)
							.expect(200)
							.end(function(chatuserDeleteErr, chatuserDeleteRes) {
								// Handle Chatuser error error
								if (chatuserDeleteErr) done(chatuserDeleteErr);

								// Set assertions
								(chatuserDeleteRes.body._id).should.equal(chatuserSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Chatuser instance if not signed in', function(done) {
		// Set Chatuser user 
		chatuser.user = user;

		// Create new Chatuser model instance
		var chatuserObj = new Chatuser(chatuser);

		// Save the Chatuser
		chatuserObj.save(function() {
			// Try deleting Chatuser
			request(app).delete('/chatusers/' + chatuserObj._id)
			.expect(401)
			.end(function(chatuserDeleteErr, chatuserDeleteRes) {
				// Set message assertion
				(chatuserDeleteRes.body.message).should.match('User is not logged in');

				// Handle Chatuser error error
				done(chatuserDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Chatuser.remove().exec();
		done();
	});
});