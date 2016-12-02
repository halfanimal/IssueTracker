"use strict";

var express = require('express');
const path = require("path");

var app = express();

const port = 8080;

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, function () {
    console.log('Server listening on: http://localhost:%s', port);
});