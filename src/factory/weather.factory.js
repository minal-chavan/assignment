const _ = require('lodash');
const Response = require('../utils/response'),
    RESPONSE_MESSAGES = require('../utils/response-messages'),
    STATUS_CODES = require('../utils/status-codes');
    CONSTANT = require('../utils/constants');
const fs= require('fs');
const to = require('../utils/promise-handler');
const WeatherInterface = require('../interfaces/weather.interface');

const getData = async (request, h) => {
    if(isPrime(new Date().getDate())){
        let post_json={
            api_call_date:new Date().getTime(),
            weather:CONSTANT.CONSTANT_RESPONSE
        };
        let [err,data]=await to(WeatherInterface.createWeather(post_json));
        if(err){
            return h.response(Response.sendResponse(false, CONSTANT.CONSTANT_RESPONSE,RESPONSE_MESSAGES.CREATED , STATUS_CODES.INTERNAL_SERVER_ERROR)).code(STATUS_CODES.INTERNAL_SERVER_ERROR);

        }
        return h.response(Response.sendResponse(true, CONSTANT.CONSTANT_RESPONSE,RESPONSE_MESSAGES.CREATED , STATUS_CODES.OK)).code(STATUS_CODES.OK);

    }
        return h.response(Response.sendResponse(true, {},RESPONSE_MESSAGES.DATE_NOT_PRIME , STATUS_CODES.OK)).code(STATUS_CODES.OK);

}

const isPrime = num => {
    for(let i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
}
module.exports = {
    getData,
    
};