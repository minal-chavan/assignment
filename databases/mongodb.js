

const Mongoose = require("mongoose"),
	Config = require('config');

exports.init = function () {
	console.log("Envoirment:", Config.env, Config.database.mongo)
	let connection_uri = '';
	//if (Config.env === 'local') {
		if (Config.database.mongo.username && Config.database.mongo.password) {
			connection_uri = `mongodb://${Config.database.mongo.username}:${Config.database.mongo.password}@${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}?authSource=admin`;
		} else {
			connection_uri = `mongodb://${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}`;
		}
	// } else {
	// 	if (Config.database.mongo.username && Config.database.mongo.password) {
	// 		// connection_uri = `mongodb://${config.database.mongo.username}:${config.database.mongo.password}@${config.database.mongo.clusterHosts}/${config.database.mongo.name}?authSource=admin&replicaSet=${config.database.mongo.replicaSetName}`;
	// 		connection_uri = `mongodb://${Config.database.mongo.username}:${Config.database.mongo.password}@${Config.replicaConfig.clusterHosts}/${Config.database.mongo.name}?replicaSet=${Config.replicaConfig.replicaSetName}&authSource=admin`;
	// 	} else {
	// 		connection_uri = `mongodb://${Config.replicaConfig.clusterHosts}/${Config.database.mongo.name}?replicaSet=${Config.replicaConfig.replicaSetName}`;
	// 	}
	// }

	Mongoose.connect(connection_uri, {
		useNewUrlParser: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 1000
	});

	Mongoose.connection.on('connected', function () {
		console.log('Mongoose default connection open to ' + 'mongodb://' + Config.database.mongo.host + '/' + Config.database.mongo.name);
	});

	Mongoose.connection.on('error', function (err) {
		console.log('Mongoose default connection error: ' + err);
	});


	Mongoose.connection.on('disconnected', function () {
		log.info('Mongoose default connection disconnected');
	});


	process.on('SIGINT', function () {
		Mongoose.connection.close(function () {
			log.info('Mongoose default connection disconnected through app termination');
			process.exit(0);
		});
	});
};
