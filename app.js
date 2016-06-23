const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/Search', urlencodedParser, (req, res) => {
  res.sendFile( __dirname + '/' + 'example.json');
});

const server = http.createServer(app);

server.listen(7788);

module.exports = app;
