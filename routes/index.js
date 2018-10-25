"use strict";

let express = require('express');
let logger = require("../core/logger");


module.exports = function(app, db) {

	// Index page
	app.get("/", function(req, res) {
    logger.info("---> render index!");
		res.render('index', { title: 'Express' });
	});

	// Handle users routes
	require("./users")(app, db);
};
