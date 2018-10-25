"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

let moment 		= require("moment");
let chalk 		= require("chalk");

let logger = require("./logger");
let config = require("../config");

let http = require("http");

function initLocalVariables(app) {
    logger.info(chalk.yellow(":->:initLocalVariables"));
	// Setting application local variables
	app.locals.app = config.app;

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + "://" + req.headers.host + req.url;
		return next();
	});

	app.locals.year = moment().format("YYYY");
	app.locals.features = config.features;
}
function initViewEngine(app) {
    logger.info(chalk.yellow(":->:initViewEngine"));
    // view engine setup
    app.set('views', path.join(__dirname, "..", 'views'));
    app.set('view engine', 'jade');
}
function initMiddleware(app) {
    logger.info(chalk.yellow(":->:initMiddleware"));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "..", 'public')));
}

function initErrorHandler(app){
    logger.info(chalk.yellow(":->:initErrorHandler"));
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
  
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
  
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

module.exports = function(db){
    let app = express();

    initLocalVariables(app);

    initViewEngine(app);

    initMiddleware(app);

    require("../routes")(app, db);

    initErrorHandler(app);

    var server = http.createServer(app);

    return server;
}