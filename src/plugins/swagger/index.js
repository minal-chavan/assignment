/*
 * Created on Tue Aug 06 2019
 *
 * Created by minal chavan
 * 
 */
const config = require('config'),
	{ resolve } = require('path'),
	register = async (server) => {
		try {
			return server.register([
				require('@hapi/inert'),
				require('@hapi/vision'),
				{
					plugin: require('hapi-swagger'),
					options: {
						info: {
							title: 'APIs',
							description: 'Api Documentation',
							version: '1.0',
							//termsOfService: '',
							contact: {
								name: 'Assignment',
								//url: '',
								email: 'minchavan27@gmail.com',
							},
						},
						host: config.server.host,
						basePath: config.swagger_basepath,
						//schemes: ['https', 'http'],
						tags: [
							
						],
						grouping: 'tags',
						templates: resolve('public', 'templates'),
						// swaggerUI : true,
						// swaggerUIPath : `${config.swagger_basepath}/swaggerui/`,
						// documentationPage : true,
						// documentationPath : '/documentation'
					},
				},
			]);
		} catch (err) {
			console.log(`Error registering swagger plugin: ${err}`);
		}
	};

module.exports = {
	register,
	info: { name: 'Swagger Documentation', version: '1.0.0' },
};
