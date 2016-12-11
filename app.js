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

// export server for the modules which needs it
module.exports = server;

// modules
var twitchapi = require('./backend/twitchapi');
var socket = require('./backend/socket');

// API handlers
var config = require('./backend/api/v1/config');
var followers = require('./backend/api/v1/followers');
var timers = require('./backend/api/v1/timers');

// API (v1)
app.use('/api/v1/config', config.router);
app.use('/api/v1/followers', followers.router);
app.use('/api/v1/timers', timers.router);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
