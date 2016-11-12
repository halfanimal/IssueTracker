class Issue {
    constructor(title, date, priority, done) {
        let self = this;
        riot.observable(self);

        self.title = title;
        self.date = date;
        self.priority = priority;
        self.done = done;

        self.on('toggleDone', function() {
            if(self.done == true) {
                self.done = false;
            } else {
                self.done = true;
            }
            self.trigger('doneToggled');
        });
    }
}