const Server = require("./server"),
    MongoDatabase = require("./databases/mongodb");


const Hapi = require('@hapi/hapi');
const HapiCron = require('hapi-cron');

// const server = new Hapi.Server();

 require('app-module-path').addPath(__dirname);
console.log(`Running environment ==> ${process.env.NODE_ENV}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", error => {
    console.log(`uncaughtException ==> ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", reason => {
    console.log(`unhandledRejection ==> ${reason}`);
});


// Init Database
const database = MongoDatabase.init();

//Start node server
Server.init(database);

