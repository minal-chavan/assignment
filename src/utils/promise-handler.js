/**
  * Function to handle errors in promises
  */
 module.exports = (promise) => promise.then((data) => [null, data])
 .catch((err) => [err]);
