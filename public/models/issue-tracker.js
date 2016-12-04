class IssueTracker {
    constructor() {
        let self = this;
        self.collection = [];
        riot.observable(self);

        self.localStorageKey = 'issueTrackerCollection';


        let getProjects = function(done) {
            $.getJSON('/api/projects', function(data) {
                done(data);
            });
        };



        self.on('fetchCollection', function() {
            self.collection = [];
            //(JSON.parse(localStorage.getItem(self.localStorageKey)) || [])
            getProjects(function(data) {
                console.log('projekte: ', data);
                data.forEach(function(projectData) {
                    self.createProject({id: projectData.id, title: projectData.title});
                });
            });
            
            self.trigger('collectionFetched');
        });
        

        self.on('updateCollection', function() {
            /*localStorage.setItem(self.localStorageKey, JSON.stringify(self.collection.map(function(project) {
                return project.getAllData();
            })));*/
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

    unselectAllProjects() {
        let self = this;
        self.collection.forEach(function (notSelectedProject) {
            notSelectedProject.unselect();
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

        return project;

    }

    addProject(projectData) {

        let self = this;

        let project = self.createProject(projectData);

        $.ajax({
            type: 'POST',
            url: '/api/projects',
            data: JSON.stringify({
                "id": projectData.id,
                "client_id": 0,
                "title": projectData.title,
                "active": true
            }),
            success: function(data) { self.trigger('updateCollection'); },
            contentType: "application/json",
            dataType: 'json'
        });

        /*$.post( 'api/projects', {
            "id": projectData.id,
            "client_id": 0,
            "title": projectData.title,
            "active": true
        });*/
    }
}