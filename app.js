// babel compiler
require('babel-register');

// paths
require('app-module-path').addPath(__dirname + '/');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var swig = require('swig');
var cors = require('cors');

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
var status = require('./backend/api/v1/status');

// CORS for API
// List of accepted domains
var whitelist = ['http://localhost:4000', 'http://localhost:5000'];

// Custom matcher function
var corsOpts = {
    origin: function(origin, cb) {
        var isWhitelisted = whitelist.indexOf(origin) !== -1;
        cb(isWhitelisted ? null : 'Bad Request', isWhitelisted);
    },
};

// API (v1)
app.use('/api/v1/config', cors(), config.router);
app.use('/api/v1/followers', cors(), followers.router);
app.use('/api/v1/timers', cors(), timers.router);
app.use('/api/v1/status', cors(), status.router);

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
