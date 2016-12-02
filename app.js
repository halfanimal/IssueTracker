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

app.delete('/api/project/:project_id/issues/:id', function(req, res){
    console.log(req.params.project_id);
    res.send(JSON.stringify(req.params.project_id));
});


app.put('/api/project/:project_id/issues/:id', function(req, res){
    console.log(req.params.project_id);
    res.send(JSON.stringify(req.params.project_id));
});

app.get('/api/project/:project_id/issues', function(req, res) {

});

app.post('/api/project/:project_id/issues', function(req, res) {

});

app.get('/api/tests/plus', function(req, res) {

});

app.post('/api/tests/minus', function(req, res) {

});

app.post('/api/tests/echo', function(req, res) {

});

app.put('/api/tests/echo', function(req, res) {

});

app.post('/api/projects', function(req, res) {

});

app.delete('/api/projects/:id', function(req, res) {

});

app.get('/api/projects/:id', function(req, res) {

});

/**
 * This method retrives all projects
 */
app.get('/api/projects/', function(req, res) {

});

app.put('/api/projects/:id', function(req, res) {

});

app.listen(port, function () {
    console.log('Server listening on: http://localhost:%s', port);
});