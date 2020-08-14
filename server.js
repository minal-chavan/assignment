/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable global-require */
const Hapi = require('@hapi/hapi'),
	Config = require('config'),
	//SessionValidation = require('./src/validations/session.validations'),
	Routes = require('./src/routes'),
	_plugins = require('./src/plugins/index');



exports.init = async (database) => {
	try {
		const port = process.env.PORT || Config.server.port;
		const server = new Hapi.Server({
			state: {
				strictHeader: false
			},
			debug: { request: ['error'] },
			port,
			routes: {
				cors: true
			},
		});

		const pluginOptions = { database };

		const pluginPromises = [];

		_plugins().forEach((pluginName) => {
			// eslint-disable-next-line import/no-dynamic-require
			const plugin = require(`./src/plugins/${pluginName}`);
			console.log(
				`Register Plugin ${plugin.info.name} - ${plugin.info.version}`,
			);
			pluginPromises.push(plugin.register(server, pluginOptions));
		});

		await Promise.all(pluginPromises);
		// let userData = await UsersInterface.findOneUser(request.params.)
		
		for (const route in Routes) {
			console.log('### ROUTES => ', route);
			server.route(Routes[route]);
		}

		server.start();

		server.events.on('response', (request) => {
			if (request.response) {
				console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.pathname} --> ${request.response.statusCode}`);
			} else {
				console.log('No statusCode : ', `${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.pathname} --> `);
			}
		});

		server.events.on('route', (route) => {
			console.log(`New route added: ${route.path}`);
		});
		server.events.on('start', () => {
			console.log('Node server is running on ==> ', server.info.uri);
		});
		server.events.on('stop', () => {
			console.log('Server has been stopped');
		});
		return server;
	} catch (err) {
		//log.error('Error starting server: ', err);
		throw err;
	}
};
