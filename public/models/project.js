class Project {
    constructor(data) {
        console.assert(data !== undefined && data !== null);
        console.assert(typeof(data.title) === 'string');
        let self = this;

        self.data = data;
        riot.observable(self);

        if(self.data.id === undefined)
            self.id = self.uuid();
        if(self.data.issues === undefined)
            self.data.issues = [];

        self.on('addIssue', function(issue) {
            issue.id = self.uuid();
            self.data.issues.push(issue);
            self.trigger('issueAdded');
            self.trigger('updateCollection');
        });
        
        self.on('removeIssue', function(issue) {
            var indexToRemove;
            for(i = 0; self.data.issues.length; i++) {
                if(issue.id == self.data.issues[i].id) {
                    indexToRemove = i;
                    break;
                }
            }
            self.data.issues.splice(indexToRemove, 1);
            self.trigger('issueRemoved');
            self.trigger('updateCollection');
        });

        self.on('select', function() {
            console.log('Project selected');
            self.trigger('selected');
        });


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
            if(issue.done == false) {
                openIssueCount++;
            }
        });
        return openIssueCount;
    }

    getAllIssues() {
        return this.data.issues;
    }


    getTitle() {
        return this.data.title;
    }
}

