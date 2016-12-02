"use strict";

var express = require('express');
const path = require("path");

var app = express();
var fs = require('fs');

const port = 8080;
const dbFilePath =  __dirname + "/" + "database.json";

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.delete('/api/project/:project_id/issues/:id', function(req, res){
    console.log('Delete issue ' + req.params.id + ' from project ' + req.params.project_id);

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if(err)
            return console.log(err);

        data = JSON.parse(data);

        data['issues'] = data['issues'].filter(function (issue) {
            return !(issue.project_id == req.params.project_id && issue.id == req.params.id);
        });

        fs.writeFile(dbFilePath, JSON.stringify(data), 'utf8', function (err) {
            if (err)
                return console.log(err);
        });

        res.json(data);
        //res.send('Issue ' + req.params.id + ' from project ' + req.params.project_id + ' deleted');
    });
});


app.put('/api/project/:project_id/issues/:id', function(req, res){
    console.log(req.params.project_id);
    res.json(req.params.project_id);
});

app.get('/api/project/:project_id/issues', function(req, res) {
    console.log('Get issues from project: ' + req.params.project_id);

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if(err)
            return console.log(err);

        data = JSON.parse(data);

        res.json(data['issues'].filter(function(issue) {
            return issue.project_id == req.params.project_id;
        }));
    });
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
    console.log('Get project: ' + req.params.id);

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
            return console.log(err);

        data = JSON.parse(data);

        res.json(data['projects'].filter(function (project) {
           return project.id == req.params.id;
        }));
    });
});

/**
 * This method retrives all projects
 */
app.get('/api/projects/', function(req, res) {
    console.log('Get projects');

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
            return console.log(err);

        data = JSON.parse(data);

        res.json(data['projects']);
    });
});

app.put('/api/projects/:id', function(req, res) {
    console.log('Put project: ' + req.params.id);

    var project = new ProjectModel({
        id: req.body.id,
        client_id: req.body.client_id,
        title: req.body.title,
        active: req.body.active
    });

    
});

app.listen(port, function () {
    console.log('Server listening on: http://localhost:%s', port);
});