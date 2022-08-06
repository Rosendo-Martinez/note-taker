import uniqid from 'uniqid';
import Note from './Note';

const NoteTaker = (function() {
    let notes = [];

    function getNoteIndex(id) {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                return i;
            }
        }
    }

    function getNote(id) {
        return notes[getNoteIndex(id)];
    }

    function editNote(id, newTitle, newDescription) {
        const note = getNote(id);
        note.setTitle(newTitle);
        note.setDescription(newDescription);
    }

    function deleteNote(id) {
        notes.splice(getNoteIndex(id),1);
    }

    function createNote(title, description, id=uniqid()) {
        notes.push(new Note(title, description, id));
    }

    function getNotes() {
        return notes;
    }

    function setNotes(newNotes) {
        notes = newNotes;
    } 

    return {editNote, deleteNote, createNote, getNote, getNotes, setNotes};
})();

export { NoteTaker };