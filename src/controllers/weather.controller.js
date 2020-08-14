const Validations = require('../validations/weather.validation'),
weatherFactory = require('../factory/weather.factory');


module.exports = {
    getData: {
    description: 'Get data on prime Dates',
    //validate: Validations.getData,  
    tags: ['api', 'Weather'],
    plugins: {
        'hapi-swagger': {
            responses: {
                200: { description: 'Success' },
                400: { description: 'Bad Request' },
                401: { description: 'Invalid credentials' },
                500: { description: 'Exception at server side' },
            },
        },
    },
    handler: async (request, h) => { return weatherFactory.getData(request, h) },
},
}