let mongoose = require('mongoose');
require('./user');
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
