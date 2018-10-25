"use strict";

module.exports = {

	// Secret for ID hashing
	hashSecret: "yS02Ry7lTzgOJFhCnU06o1rDmHBoLlfxjCx0T7VDH23",

	// Secret for session hashing
	sessionSecret: "7z99iJ9da1pAq43uu9YbgNTYVhtQ4nmQHohlDLYMIwA",

	// Application settings
	app: {
		//title: "VEM APP",
		//version: "1.0.0",
		//description: "This is my boilerplate web app",
		//url: "http://localhost:3000/"
	},

	// ip: process.env.NODE_IP || "0.0.0.0",
	// port: process.env.NODE_PORT || 3000,

	// dataFolder: path.join(global.rootPath, "data"),
	// logFolder: path.join(global.rootPath, "logs"),

	// Database (Mongo) settings
	db: {
		// uri: process.env.MONGO_URI || "mongodb://localhost/vemapp",
		options: {
			user: process.env.MONGO_USERNAME || "",
			pass: process.env.MONGO_PASSWORD || "",
			useNewUrlParser: true
		}
	},

	// Logging settings
	logging: {

		console: {
			// level: "debug"
		},

		file: {
			enabled: false,
			// path: path.join(global.rootPath, "logs"),
			// level: "info",
			// json: false,
			// exceptionsSeparateFile: true
		}
	}

};