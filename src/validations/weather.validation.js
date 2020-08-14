const Joi = require('@hapi/joi');

module.exports = (() => ({
    generateURL: {
        query: {
            account_name: Joi.string().required().example('account name'),
            
        }
    },
    verifyOtp: {
        query: {
            secrete: Joi.string().required().example('account name'),
            otp: Joi.string().required().example('account name'),
            
        }
    },
    
}))();