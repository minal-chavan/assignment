const UsersController = require('../controllers/weather.controller');

module.exports = [
    { method: 'GET', path: '/v1/Data', config: UsersController.getData },
]