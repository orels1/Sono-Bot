// babel compiler
require('babel-register');

// paths
require('app-module-path').addPath(__dirname + '/');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var swig = require('swig');

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

// Frontend (web)
var swig  = require('swig'),
    React = require('react'),
    ReactDOM = require('react-dom/server'),
    Router = require('react-router'),
    routes = require('frontend/app/routes');

// React Middleware
app.use(function(req, res) {
    Router.match({ 'routes': routes.default, 'location': req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
            var page = swig.renderFile('frontend/views/index.html', { 'html': html });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found');
        }
    });
});
