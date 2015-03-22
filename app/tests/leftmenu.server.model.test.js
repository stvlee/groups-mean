'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Leftmenu = mongoose.model('Leftmenu');

/**
 * Globals
 */
var user, leftmenu;

/**
 * Unit tests
 */
describe('Leftmenu Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			leftmenu = new Leftmenu({
				name: 'Leftmenu Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return leftmenu.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			leftmenu.name = '';

			return leftmenu.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Leftmenu.remove().exec();
		User.remove().exec();

		done();
	});
});