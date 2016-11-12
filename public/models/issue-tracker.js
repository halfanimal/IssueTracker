class IssueTracker {
    constructor() {
        let self = this;
        riot.observable(self);

        self.localStorageKey = 'issueTrackerCollection';

        self.on('fetchCollection', function() {
            self.collection = JSON.parse(localStorage.getItem(self.localStorageKey)) || [];
            self.trigger('collectionFetched');
        });

        self.on('updateCollection', function() {
            localStorage.setItem(self.localStorageKey, JSON.stringify(self.collection));
            self.trigger('collectionUpdated', self.collection);
        })

        self.on('addProject', function(project) {
            self.collection.push(project);
            self.trigger('updateCollection');
        });

        self.trigger('fetchCollection');
    }
}

var i = new IssueTracker();
