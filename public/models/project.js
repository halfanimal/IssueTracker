"use strict";

class Project {
    constructor(data) {
        console.assert(data !== undefined && data !== null);
        console.assert(typeof(data.title) === 'string');
        let self = this;

        riot.observable(self);

        self.data = {};

        self.data.title = data.title;

        if(data.id === undefined)
            self.data.id = self.uuid();
        else
            self.data.id = data.id;

        if(data.issues === undefined) {
            self.data.issues = [];
        } else {
            self.data.issues = [];
            data.issues.forEach(function(issueData) {
                self.createIssue(issueData);
            });
        }
    }

    getAllData() {
        let self = this;
        return {
            id: self.data.id,
            title: self.data.title,
            issues: self.data.issues.map(function(issue) { return issue.getAllData(); })
        };
    }

    createIssue(issueData) {
        let self = this;
        if(issueData.id === undefined) {
            issueData.id = self.uuid();
        }
        let issue = new Issue(issueData);

        issue.on('remove', function() {
            self.removeIssue(issue);
        });

        issue.on('doneToggled', function() {
            self.trigger('updateCollection');
        });
        self.data.issues.push(issue);

        return issue;
    }

    addIssue(issueData) {
        let self = this;

        self.createIssue(issueData);


        $.post('/api/project/' + self.data.id + '/issues/', {
            id: issueData.id,
            project_id: self.id,
            "client_id": 0,
            "project_client_id": 0,
            "done": issueData.done,
            title: issueData.title,
            "priority": issueData.priority,
            "due_date": "2016-12-03T09:54:42.380Z"
        }, function(rec) {

        });

        self.trigger('issueAdded');
        self.trigger('updateCollection');
    }

    removeIssue(issue) {
        let self = this;
        self.data.issues.splice(self.data.issues.indexOf(issue), 1);
        console.log('issues', self.data.issues);


        $.ajax({
            url: '/api/project/' + self.data.id + '/issues/' + issue.getId(),
            type: 'DELETE',
            success: function(result) {
                // Do something with the result
            }
        });



        self.trigger('issueRemoved');
        self.trigger('updateCollection');
    }

    uuid() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        console.log(uuid);
        return uuid;
    }

    getOpenIssues() {
        let self = this;
        let openIssueCount = 0;
        self.data.issues.forEach(function(issue) {
            if(issue.getDone() == false) {
                openIssueCount++;
            }
        });
        return openIssueCount;
    }

    select() {
        let self = this;
        console.log('Project selected');

        $.getJSON('/api/project/' + self.data.id + '/issues', function(issues) {
            self.data.issues = [];
            issues.forEach(function(issueData) {
                createIssue({id: issueData.id, title: issueData.title});
            });
        });


        self.trigger('selected');
    }

    unselect() {
        let self = this;
        console.log('Project unselected');
        self.trigger('unselect');
    }


    getAllIssues() {
        return this.data.issues;
    }

    getId() {
        return this.data.id;
    }

    getTitle() {
        return this.data.title;
    }
}

