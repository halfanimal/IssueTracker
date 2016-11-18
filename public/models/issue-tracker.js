class IssueTracker {
    constructor() {
        let self = this;
        self.collection = [];
        riot.observable(self);

        self.localStorageKey = 'issueTrackerCollection';

        self.on('fetchCollection', function() {
            self.collection = [];
            (JSON.parse(localStorage.getItem(self.localStorageKey)) || []).forEach(function(projectData) {
                self.createProject(projectData);
            });
            
            self.trigger('collectionFetched');
        });
        

        self.on('updateCollection', function() {
            localStorage.setItem(self.localStorageKey, JSON.stringify(self.collection.map(function(project) {
                return project.getAllData();
            })));
            self.trigger('collectionUpdated');
        });

        self.trigger('fetchCollection');
    }

    getProjectById(id) {
        let self = this;
        return self.collection.find(function(p) {
            return p.getId() === id;
        });

    }

    createProject(projectData) {
        let self = this;
        let project = new Project(projectData);

        project.on("selected", function() {
            self.trigger('projectSelected', project);

            self.collection.forEach(function(notSelectedProject) {
                if(project !== notSelectedProject) {
                    notSelectedProject.unselect();
                }
            });
        });
        project.on('updateCollection', function() {
            self.trigger('updateCollection');
        });
        self.collection.push(project);
    }

    addProject(projectData) {

        let self = this;
        self.createProject(projectData);
        self.trigger('updateCollection');
    }
}