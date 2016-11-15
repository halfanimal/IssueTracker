class IssueTracker {
    constructor() {
        let self = this;
        riot.observable(self);

        self.localStorageKey = 'issueTrackerCollection';

        self.on('fetchCollection', function() {
            self.collection = (JSON.parse(localStorage.getItem(self.localStorageKey)) || []).map(function(project) {
                return new Project(project);
            });
            self.trigger('collectionFetched');
        });

        self.on('updateCollection', function() {
            localStorage.setItem(self.localStorageKey, JSON.stringify(self.collection.map(function(project) {
                return project.data;
            })));
            self.trigger('collectionUpdated');
        })

        self.on('addProject', function(project) {
            console.log('Add project to collection.');
            self.collection.push(project);
            self.trigger('updateCollection');
        });

        self.trigger('fetchCollection');
    }
}