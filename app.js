var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/Search', urlencodedParser, function (req, res) {
    res.sendFile(__dirname + "/" + 'example.json');
});

var server = http.createServer(app);

server.listen(7788);

module.exports = app;