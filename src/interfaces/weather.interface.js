
const Weather = require('../model/weather.model');

const createWeather = data => {
  const newRecord = new Weather(data);
  return newRecord.save();
};
const findWeather= (condition, select_values) => Weather.find(condition, select_values);
module.exports={
    createWeather,
    findWeather,
}