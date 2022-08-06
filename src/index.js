import { UI } from "./UI";
import { Storage } from './Storage';

document.addEventListener('DOMContentLoaded', () => {
    Storage.handleOnPageLoad();
    UI.renderNotes();
});