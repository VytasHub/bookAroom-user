var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var dotenv = require('dotenv');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/'));

app.listen(port, function () {
        console.log('Our app is running on port: ' + port);
});
