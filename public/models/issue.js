"use_strict"

class Issue {
    constructor(data) {
        let self = this;
        riot.observable(self);
        self.data = {};
        self.data.id = data.id;
        self.data.title = data.title;
        self.data.priority = data.priority;
        self.data.done = data.done;
        self.data.date = data.date;
    }

    remove() {
        this.trigger('remove');
    }

    toggleDone() {
        let self = this;
        if(self.data.done == true) {
            self.data.done = false;
        } else {
            self.data.done = true;
        }
        self.trigger('doneToggled');
    }

    getAllData() {
        return this.data;
    }

    getTitle() {
        return this.data.title;
    }

    getDone() {
        return this.data.done;
    }

    getDate() {
        return this.data.date;
    }

    getPriority() {
        return this.data.priority;
    }
}