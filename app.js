// babel compiler
require("babel-register");

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

var express = require('express');

var app = express();

// App Middleware
app.set('port', process.env.PORT || 5000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
    console.log('Sono bot is available at http://localhost:' + app.get('port'));
});