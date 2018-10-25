"use strict";

let debug = require('debug')('florasever:server');

let config		= require("./config");
let logger 		= require("./core/logger");
let moment 		= require("moment");
let chalk 		= require("chalk");

logger.info("");
logger.info(chalk.bold("---------------------[ Server starting at " + moment().format("YYYY-MM-DD HH:mm:ss.SSS") + " ]---------------------------"));
logger.info("");

logger.info(chalk.bold("Application root path: ") + global.rootPath);

let init		= require("./core/init");

let db = require("./core/mongo");

let app = require("./core/express")(db);

app.listen(config.port, config.ip, function() {
  logger.info("");
	logger.info(config.app.title + " v" + config.app.version + " application started!");
	logger.info("----------------------------------------------");
	logger.info("Environment:\t" + chalk.underline.bold(process.env.NODE_ENV));
	logger.info("IP:\t\t" + config.ip);
	logger.info("Port:\t\t" + config.port);
	logger.info("Database:\t\t" + config.db.uri);
	logger.info("");

	require("./utils/sysinfo")();

	logger.info("----------------------------------------------");
});
app.on('error', onError);
app.on('listening', onListening);

  /**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = app.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


exports = module.exports = app;
