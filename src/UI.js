import {NoteTaker} from "./NoteTaker";
import Note from "./Note";

const UI = (function () {

    function getNoteHTML(noteTitle, noteDescription, noteId) {
        return `
            <div class='note'>
                <div id='${noteId}' class='note-button-container'>
                    <button class='edit-note-button'>
                        <img class='edit-note-button-icon' src='./images/edit (1).png' alt='edit note icon'>
                    </button>
                    <button class='delete-note-button'>
                        <img class='delete-note-button-icon'src='./images/delete.png' alt='delete note icon'>
                    </button>
                </div>
                <h2 class='note-title'>${noteTitle}</h2>
                <p class='note-description'>${noteDescription}</p>
            </div>
        `;
    }

    function getAllNotesHTML() {
        let notesHTML = '';
        NoteTaker.getNotes().forEach(note => {
            notesHTML += getNoteHTML(note.getTitle(), note.getDescription(), note.getId());
        });
        return notesHTML;
    }

    function renderNotes() {
        const notesContainer = document.querySelector('.notes-container');
        notesContainer.innerHTML = getAllNotesHTML() + getCreateNewNoteCardHTML();
    }

    function getCreateNewNoteCardHTML() {
        return `
            <div class='note create-note-container'>
                <button class="create-note-button">
                    <img class="create-note-button-icon" src="./images/add.png" alt="add note icon">
                </button>
            </div>`;
    }

    function createNoteAndRenderNewSetOfNotes(title, description) {
        NoteTaker.createNote(title, description);
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
        const callback = formClass === 'create-note-form' ? handleCreateNewNoteFormSubmit : handleEditNoteFormSubmit;
        addEventListenerToForm(document.querySelector(`.${formClass}`), callback);
    }

    function getFormHTML(formClass, taskId) {
        const note = NoteTaker.getNote(taskId);
        const inputTitleValue = formClass === 'edit-note-form' ? note.getTitle() : '';
        const inputDescriptionValue = formClass === 'edit-note-form' ? note.getDescription() : '';
        return `
            <div class="form-modal-container">
                <form class="${formClass} note-form" id=${taskId} onsubmit="return false">
                    <input type="text" class="note-title-input" name="title" placeholder="title" value="${inputTitleValue}"></input>
                    <textarea class="note-description-input" name="description" placeholder="description...">${inputDescriptionValue}</textarea>
                    <button class="submit-note-button">Submit</button>
                </form>
            </div>
        `;
    }

    function removeForm() {
        document.querySelector('body').removeChild(document.querySelector('.form-modal-container'));
    }

    function addEventListenerToForm(form, callback) {
        form.addEventListener('submit', callback);
    }

    function handleCreateNewNoteFormSubmit() {
        createNoteAndRenderNewSetOfNotes(document.querySelector('.note-title-input').value, document.querySelector('.note-description-input').value);
        removeForm();
    }

    function handleEditNoteFormSubmit(e) {
        editNoteAndRenderNewSetOfNotes(document.querySelector('.note-title-input').value, document.querySelector('.note-description-input').value, e.target.id);
        removeForm();
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-note-button')) {
            renderForm('edit-note-form', e.target.parentElement.id);
        } else if (e.target.classList.contains('edit-note-button-icon')) {
            renderForm('edit-note-form', e.target.parentElement.parentElement.id);
        } else if (e.target.classList.contains('delete-note-button')) {
            deleteNoteAndRenderNewSetOfNotes(e.target.parentElement.id);
        } else if (e.target.classList.contains('delete-note-button-icon')) {
            deleteNoteAndRenderNewSetOfNotes(e.target.parentElement.parentElement.id);
        } else if (e.target.classList.contains('create-note-container') || 
                e.target.classList.contains('create-note-button') || 
                e.target.classList.contains('create-note-button-icon')) {
            renderForm('create-note-form');
        }
    })

    return {renderNotes};
})();

export {UI};