import Note from "./Note";
import { NoteTaker } from "./NoteTaker";

const Storage = (function() {

    const NOTES_KEY = 'notes';

    function handleOnPageLoad() {
        const jsonArray = localStorage.getItem(NOTES_KEY);
        if (jsonArray !== null) {
            renderNotesToNoteTaker(JSON.parse(jsonArray));
        }
    }

    function renderNotesToNoteTaker(array) {
        for (let i = 0; i < array.length; i++) {
            NoteTaker.createNote(array[i].title, array[i].description, array[i].id);
        }
    }

    function updateLocalStorageNotes() {
        localStorage.setItem(NOTES_KEY, JSON.stringify(NoteTaker.getNotes()));
    }

    return {handleOnPageLoad, updateLocalStorageNotes};
})();

export { Storage };