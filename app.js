"use strict";
var fs = require('fs');
var path = require("path");
var express = require('express');
var body_parser = require('body-parser');
var morgan = require('morgan');

var app = express();
var port = parseInt(process.env.PORT, 10) || 8080;
var dbFilePath =  __dirname + "/" + "database.json";

app.use(morgan('dev'));
app.use(body_parser.json());
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.delete('/api/project/:project_id/issues/:id', function(req, res){
    //console.log('Delete issue ' + req.params.id + ' from project ' + req.params.project_id);

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

            res.json(data);
        });
    });
});


app.put('/api/project/:project_id/issues/:id', function(req, res){
    //console.log('Updating issue: ' + req.params.id);

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
           console.log(err);

        data = JSON.parse(data);

        var reqIssue = createIssueObj(req.body);

        data['issues'] = data['issues'].map(function(issue) {
            return (issue.project_id == req.params.project_id && issue.id == req.params.id) ? reqIssue : issue;
        });

        fs.writeFile(dbFilePath, JSON.stringify(data), 'utf8', function(err, data) {
            if(err)
                console.log(err);
        });

        res.json(reqIssue);
    });
});

app.get('/api/project/:project_id/issues', function(req, res) {
    //console.log('Get issues from project: ' + req.params.project_id);

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
    //console.log('Create and save issue');

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
            console.log(err);

        data = JSON.parse(data);

        var reqIssue = createIssueObj(req.body);

        data['issues'].push(reqIssue);

        fs.writeFile(dbFilePath, JSON.stringify(data), 'utf8', function(err, data) {
            if(err)
                console.log(err);

            res.json(reqIssue);
        });
    });
});

app.get('/api/tests/plus', function(req, res) {
    res.send('Not implemented yet');
});

app.post('/api/tests/minus', function(req, res) {
    res.send('Not implemented yet');
});

app.post('/api/tests/echo', function(req, res) {
    res.send('Not implemented yet');
});

app.put('/api/tests/echo', function(req, res) {
    res.send('Not implemented yet');
});

app.post('/api/projects', function(req, res) {
    //console.log('Create and save project');
    
    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
            console.log(err);

        data = JSON.parse(data);

        var reqProject = createProjectObj(req.body);

        data['projects'].push(reqProject);

        fs.writeFile(dbFilePath, JSON.stringify(data), 'utf8', function(err, data) {
            if(err)
                console.log(err);

            res.json(reqProject);
        });
    });
});

app.delete('/api/projects/:id', function(req, res) {
    console.log('Delete project ' + req.params.id);

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if(err)
            return console.log(err);

        data = JSON.parse(data);

        data['projects'] = data['projects'].filter(function (project) {
            return project.id != req.params.id;
        });

        fs.writeFile(dbFilePath, JSON.stringify(data), 'utf8', function (err) {
            if (err)
                return console.log(err);

            res.json(data);
        });
    });
});

app.get('/api/projects/:id', function(req, res) {
    //console.log('Get project: ' + req.params.id);

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
            return console.log(err);

        data = JSON.parse(data);

        res.json(data['projects'].find(function (project) {
           return project.id == req.params.id;
        }));
    });
});

/**
 * This method retrives all projects
 */
app.get('/api/projects/', function(req, res) {
    //console.log('Get projects');

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
            return console.log(err);

        data = JSON.parse(data);

        res.json(data['projects']);
    });
});

app.put('/api/projects/:id', function(req, res) {
    //console.log('Updating project: ' + req.params.id);

    fs.readFile(dbFilePath, 'utf8', function (err, data) {
        if (err)
            console.log(err);

        data = JSON.parse(data);

        var reqProject = createProjectObj(req.body);

        data['projects'] = data['projects'].map(function(project) {
            return (project.id == req.params.id) ? reqProject : project;
        });

        fs.writeFile(dbFilePath, JSON.stringify(data), 'utf8', function(err, data) {
            if(err)
                console.log(err);
        });

        res.json(data);
    });
});

app.listen(port, function () {
    console.log('Server listening on: http://localhost:%s', port);
});

function createIssueObj(reqBody) {
    return {
        id: reqBody.id,
        project_id: reqBody.project_id,
        client_id: reqBody.client_id,
        project_client_id: reqBody.project_client_id,
        done: reqBody.done,
        title: reqBody.title,
        priority: reqBody.priority,
        due_date: reqBody.due_date
    };
}

function createProjectObj(reqBody) {
    return {
        id: reqBody.id,
        client_id: reqBody.client_id,
        title: reqBody.title,
        active: reqBody.active
    };
}