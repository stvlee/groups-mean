'use strict';

module.exports = function(app) {

    var mastercard = require('../../app/controllers/mastercard.server.controller');


	// Routing logic   
	// ...

    app.route('/atms')
        .get(mastercard.atms);

    app.route('/payment')
        .post(mastercard.payment);

    app.route('/refund')
        .post(mastercard.refund);


};
