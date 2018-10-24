"use strict";

let path = require("path");
let pkg = require("../package.json");

module.exports = {
    app:{
        title: pkg.title,
		version: pkg.version,
        description: pkg.description,
        url: "http://localhost:" + (process.env.PORT || 3000) + "/"
    },
    ip: process.env.NODE_IP || "0.0.0.0",
    port: process.env.PORT || 3000,

    rootPath: global.rootPath,
    dataFolder: path.join(global.rootPath, "data"),
    
    uploadLimit: 2 * 1024 * 1024, // 2MB

    test: false,

	db: {
		uri: process.env.MONGO_URI || "mongodb://localhost/" + pkg.config.dbName + "-dev",
		options: {
			user: "",
			pass: "",
			keepAlive: 1,
			useNewUrlParser: true
		}
	},

    cacheTimeout: 5 * 60, // 5 mins

    sessions: {
		cookie: {
			// session expiration is set by default to one week
			maxAge: 7 * 24 * (60 * 60 * 1000),

			// httpOnly flag makes sure the cookie is only accessed
			// through the HTTP protocol and not JS/browser
			httpOnly: true,

			// secure cookie should be turned to true to provide additional
			// layer of security so that the cookie is set only when working
			// in HTTPS mode.
			secure: false
		},

		// Cookie key name
		name: "sessionId",

		// Mongo store collection name
		collection: "sessions"
    },
    
    logging: {
		console: {
			level: "silly"
        },
    },
    agendaTimer: "one minute"
};