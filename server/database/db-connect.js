let mongoose = require('mongoose');
require('./user');
require('./pitch');
let dbURI = 'mongodb://admin:admin@ds241668.mlab.com:41668/pitch-7';

mongoose.connect(dbURI);
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ', dbURI);
});
mongoose.connection.on('error', function(error){
    console.log('Mongoose connection error ', error);
});
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected to ', dbURI);
});
// //for nodemon restart
// process.once('SIGUSR2', function(){
//     gracefulShutdown('nodemon restart', function(){
//         process.kill(process.pid, "SIGUSR2");
//     });
// });

// //for app termination
// process.on('SIGINT', function(){
//     gracefulShutdown('app termination', function(){
//         process.exit(0);
//     });
// });
// //for heroku app termination
// process.on('SIGTERM', function(){
//     gracefulShutdown('Heroku app shutdown',function(){
//         process.exit(0);
//     });
// });