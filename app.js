// babel compiler
require("babel-register");

// paths
require('app-module-path').addPath(__dirname + '/');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

// App Middleware
app.set('port', process.env.PORT || 5000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(express.static(path.join(__dirname, 'public')));

// DB
var mongoose = require('mongoose');
mongoose.connect('localhost/sono');

mongoose.connection.on('error', function() {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
    console.log('Sono bot is available at http://localhost:' + app.get('port'));
});

// modules
var config = require('./backend/api/v1/config');
var twitchapi = require('./backend/twitchapi');

// API (v1)
app.use('/api/v1/config', config.router);
