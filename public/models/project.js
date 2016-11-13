class Project {
    constructor(title) {
        let self = this;
        riot.observable(self);

        self.id = self.uuid();
        self.title = title;
        self.collection = [];

        self.on('addIssue', function(issue) {
            issue.id = self.uuid();
            self.collection.push(issue);
            self.trigger('issueAdded');
            self.trigger('updateCollection');
        });
        
        self.on('removeIssue', function(issue) {
            var indexToRemove;
            for(i = 0; self.collection.length; i++) {
                if(issue.id == self.collection[i].id) {
                    indexToRemove = i;
                    break;
                }
            }
            self.collection.splice(indexToRemove, 1);
            self.trigger('issueRemoved');
            self.trigger('updateCollection');
        })
    }

    uuid() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        console.log(uuid);
        return uuid;
    }
}

