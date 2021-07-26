var express = require('express');

var server = express();

server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Server ready!');
});

server.listen(8080, function () {
    console.log('Server listening');
});