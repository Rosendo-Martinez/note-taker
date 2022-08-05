import {NoteTaker} from "./NoteTaker";
import Note from "./Note";

const UI = (function () {

    function getNoteHTML(noteTitle, noteDescription, noteId) {
        return `
            <div class='note'>
                <div id='${noteId}'>
                    <button class='edit-note'><img class='edit-note' src='./images/edit (1).png' alt='edit note icon'></button>
                    <button class='delete-note'><img class='delete-note' src='./images/delete.png' alt='delete note icon'></button>
                </div>
                <h2 class='note-title'>${noteTitle}</h2>
                <p class='note-description'>${noteDescription}</p>
            </div>
        `
    }

    function getAllNotesHTML() {
        const notes = NoteTaker.getNotes();
        let notesHTML = '';
        notes.forEach(note => {
            notesHTML += getNoteHTML(note.getTitle(), note.getDescription(), note.getId());
        })
        return notesHTML;
    }

    function renderNotes() {
        const notesContainer = document.querySelector('.notes-container');
        const notesHTML = getAllNotesHTML();
        const addNoteCard = '<div><button class="create-note-card"><img class="create-note-card-icon" src="./images/add.png" alt="add note icon"></button></div>';
        notesContainer.innerHTML = notesHTML + addNoteCard;
    }

    function createNote(title, description) {
        NoteTaker.createNote(title, description)
    }

    function createNoteAndRenderNewSetOfNotes(title, description) {
        createNote(title, description);
        renderNotes();
    }

    function deleteNoteAndRenderNewSetOfNotes(id) {
        NoteTaker.deleteNote(id);
        renderNotes();
    }

    function editNoteAndRenderNewSetOfNotes(newTitle, newDescription, id) {
        NoteTaker.editNote(id, newTitle, newDescription);
        renderNotes();
    }

    function renderForm(formClass, taskId='') {
        document.querySelector('body').innerHTML += getFormHTML(formClass, taskId);
        addEventListenerToForm(formClass);
    }

    function getFormHTML(formClass, taskId) {
        let inputTitleStr;
        let inputDescriptionStr;
        if (formClass === 'edit-note-form') {
            const note = NoteTaker.getNote(taskId);
            const titleValue = note.getTitle();
            const descriptionValue = note.getDescription();
            inputTitleStr = `<input type="text" class="note-title-input" name="title" placeholder="title" value='${titleValue}'></input>`;
            inputDescriptionStr = `<input type="text" class="note-description-input" name="description" placeholder="description..." value='${descriptionValue}'>`;
        } else {
            inputTitleStr = `<input type="text" class="note-title-input" name="title" placeholder="title"></input>`;
            inputDescriptionStr = `<input type="text" class="note-description-input" name="description" placeholder="description...">`;
        }
        return `
            <div class="form-modal-container">
                <form class="${formClass}" id=${taskId} onsubmit="return false">
                    ${inputTitleStr}
                    ${inputDescriptionStr}
                    <button class="submit-note-button">Submit</button>
                </form>
            </div>
        `;
    }

    function removeForm() {
        document.querySelector('body').removeChild(document.querySelector('.form-modal-container'));
    }

    function addEventListenerToForm(formClass) {
        if (formClass === 'create-note-form') {
            document.querySelector('.create-note-form').addEventListener('submit', () => {
                createNoteAndRenderNewSetOfNotes(document.querySelector('.note-title-input').value, document.querySelector('.note-description-input').value);
                removeForm();
            })
        } else if (formClass === 'edit-note-form') {
            document.querySelector('.edit-note-form').addEventListener('submit', (e) => {
                editNoteAndRenderNewSetOfNotes(document.querySelector('.note-title-input').value, document.querySelector('.note-description-input').value, e.target.id);
                removeForm();
            })
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('create-note-card') || (e.target.parentElement !== null && e.target.parentElement.classList.contains('create-note-card'))) {
            if (e.target.classList.contains('edit-note')) {
                renderForm('create-note-form', e.target.parentElement.id);
            } else {
                renderForm('create-note-form', e.target.parentElement.parentElement.id);
            }
        } else if (e.target.classList.contains('edit-note') || (e.target.parentElement !== null && e.target.parentElement.classList.contains('edit-note'))) {
            if (e.target.classList.contains('edit-note')) {
                renderForm('edit-note-form', e.target.parentElement.id);
            } else {
                renderForm('edit-note-form', e.target.parentElement.parentElement.id);
            }
        } else if (e.target.classList.contains('delete-note') || (e.target.parentElement !== null && e.target.parentElement.classList.contains('delete-note'))) {
            if (e.target.classList.contains('delete-note')) {
                deleteNoteAndRenderNewSetOfNotes(e.target.parentElement.id);
            } else {
                deleteNoteAndRenderNewSetOfNotes(e.target.parentElement.parentElement.id);
            }
        }
    })

    return {renderNotes};
})();

export {UI};