export default class Note {
    constructor(title, description, id) {
        this.title = title;
        this.description = description;
        this.id = id;
    }

    getTitle() {
        return this.title;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getDescription() {
        return this.description;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getId() {
        return this.id;
    }
}