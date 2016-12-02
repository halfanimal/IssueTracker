"use strict";

var express = require('express');
const path = require("path");

var app = express();
var fs = require('fs');

const port = 8080;

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.delete('/api/project/:project_id/issues/:id', function(req, res){
    console.log('Delete issue ' + req.params.id + ' from project ' + req.params.project_id);

    fs.readFile( __dirname + "/" + "database.json", 'utf8', function (err, data) {
        data = JSON.parse(data);

        res.send(JSON.stringify(data['issues'].filter(function(issue) {
            return issue.project_id == req.params.project_id;
        }).filter(function(issue) {
            return issue.id != req.params.id;
        })));
    });

    //res.send('Issue ' + req.params.id + ' from project ' + req.params.project_id + ' deleted');
});


app.put('/api/project/:project_id/issues/:id', function(req, res){
    console.log(req.params.project_id);
    res.send(JSON.stringify(req.params.project_id));
});

app.get('/api/project/:project_id/issues', function(req, res) {
    console.log('Get issues from project: ' + req.params.project_id);

    fs.readFile( __dirname + "/" + "database.json", 'utf8', function (err, data) {
        data = JSON.parse(data);

        res.send(data['issues'].filter(function(issue) {
            return issue.project_id == req.params.project_id;
        }));
    });
});

app.post('/api/project/:project_id/issues', function(req, res) {

});

app.listen(port, function () {
    console.log('Server listening on: http://localhost:%s', port);
});