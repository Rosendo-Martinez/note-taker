/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uniqid/index.js":
/*!**************************************!*\
  !*** ./node_modules/uniqid/index.js ***!
  \**************************************/
/***/ ((module) => {

/* 
(The MIT License)
Copyright (c) 2014-2021 Halász Ádám <adam@aimform.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = typeof process !== 'undefined' && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(false){ var i, networkInterfaces, mac, os; } 

//  Exports
// ================================================
module.exports = module.exports["default"] = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}


/***/ }),

/***/ "./src/Note.js":
/*!*********************!*\
  !*** ./src/Note.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Note)
/* harmony export */ });
class Note {
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

/***/ }),

/***/ "./src/NoteTaker.js":
/*!**************************!*\
  !*** ./src/NoteTaker.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoteTaker": () => (/* binding */ NoteTaker)
/* harmony export */ });
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js");
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uniqid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.js");



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

    function createNote(title, description, id=uniqid__WEBPACK_IMPORTED_MODULE_0___default()()) {
        notes.push(new _Note__WEBPACK_IMPORTED_MODULE_1__["default"](title, description, id));
    }

    function getNotes() {
        return notes;
    }

    function setNotes(newNotes) {
        notes = newNotes;
    } 

    return {editNote, deleteNote, createNote, getNote, getNotes, setNotes};
})();



/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _NoteTaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NoteTaker */ "./src/NoteTaker.js");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.js");



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
        _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.getNotes().forEach(note => {
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
        _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.createNote(title, description);
        renderNotes();
    }

    function deleteNoteAndRenderNewSetOfNotes(id) {
        _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.deleteNote(id);
        renderNotes();
    }

    function editNoteAndRenderNewSetOfNotes(newTitle, newDescription, id) {
        _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.editNote(id, newTitle, newDescription);
        renderNotes();
    }

    function renderForm(formClass, taskId='') {
        document.querySelector('body').innerHTML += getFormHTML(formClass, taskId);
        const callback = formClass === 'create-note-form' ? handleCreateNewNoteFormSubmit : handleEditNoteFormSubmit;
        addEventListenerToForm(document.querySelector(`.${formClass}`), callback);
    }

    function getFormHTML(formClass, taskId) {
        const note = _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.getNote(taskId);
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


document.addEventListener('DOMContentLoaded', () => {_UI__WEBPACK_IMPORTED_MODULE_0__.UI.renderNotes()});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXguanMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci8uL3NyYy9Ob3RlLmpzIiwid2VicGFjazovL25vdGUtdGFrZXIvLi9zcmMvTm90ZVRha2VyLmpzIiwid2VicGFjazovL25vdGUtdGFrZXIvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RlLXRha2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25vdGUtdGFrZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25vdGUtdGFrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ub3RlLXRha2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBcbihUaGUgTUlUIExpY2Vuc2UpXG5Db3B5cmlnaHQgKGMpIDIwMTQtMjAyMSBIYWzDoXN6IMOBZMOhbSA8YWRhbUBhaW1mb3JtLmNvbT5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8gIFVuaXF1ZSBIZXhhdHJpZGVjaW1hbCBJRCBHZW5lcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyAgRGVwZW5kZW5jaWVzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnZhciBwaWQgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5waWQgPyBwcm9jZXNzLnBpZC50b1N0cmluZygzNikgOiAnJyA7XG52YXIgYWRkcmVzcyA9ICcnO1xuaWYodHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKXtcbiAgICB2YXIgbWFjID0gJycsIG9zID0gcmVxdWlyZSgnb3MnKTsgXG4gICAgaWYob3MubmV0d29ya0ludGVyZmFjZXMpIHZhciBuZXR3b3JrSW50ZXJmYWNlcyA9IG9zLm5ldHdvcmtJbnRlcmZhY2VzKCk7XG4gICAgaWYobmV0d29ya0ludGVyZmFjZXMpe1xuICAgICAgICBsb29wOlxuICAgICAgICBmb3IobGV0IGludGVyZmFjZV9rZXkgaW4gbmV0d29ya0ludGVyZmFjZXMpe1xuICAgICAgICAgICAgY29uc3QgbmV0d29ya0ludGVyZmFjZSA9IG5ldHdvcmtJbnRlcmZhY2VzW2ludGVyZmFjZV9rZXldO1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gbmV0d29ya0ludGVyZmFjZS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmKG5ldHdvcmtJbnRlcmZhY2VbaV0gIT09IHVuZGVmaW5lZCAmJiBuZXR3b3JrSW50ZXJmYWNlW2ldLm1hYyAmJiBuZXR3b3JrSW50ZXJmYWNlW2ldLm1hYyAhPSAnMDA6MDA6MDA6MDA6MDA6MDAnKXtcbiAgICAgICAgICAgICAgICAgICAgbWFjID0gbmV0d29ya0ludGVyZmFjZVtpXS5tYWM7IGJyZWFrIGxvb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFkZHJlc3MgPSBtYWMgPyBwYXJzZUludChtYWMucmVwbGFjZSgvXFw6fFxcRCsvZ2ksICcnKSkudG9TdHJpbmcoMzYpIDogJycgO1xuICAgIH1cbn0gXG5cbi8vICBFeHBvcnRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uKHByZWZpeCwgc3VmZml4KXsgcmV0dXJuIChwcmVmaXggPyBwcmVmaXggOiAnJykgKyBhZGRyZXNzICsgcGlkICsgbm93KCkudG9TdHJpbmcoMzYpICsgKHN1ZmZpeCA/IHN1ZmZpeCA6ICcnKTsgfVxubW9kdWxlLmV4cG9ydHMucHJvY2VzcyA9IGZ1bmN0aW9uKHByZWZpeCwgc3VmZml4KXsgcmV0dXJuIChwcmVmaXggPyBwcmVmaXggOiAnJykgKyBwaWQgKyBub3coKS50b1N0cmluZygzNikgKyAoc3VmZml4ID8gc3VmZml4IDogJycpOyB9XG5tb2R1bGUuZXhwb3J0cy50aW1lICAgID0gZnVuY3Rpb24ocHJlZml4LCBzdWZmaXgpeyByZXR1cm4gKHByZWZpeCA/IHByZWZpeCA6ICcnKSArIG5vdygpLnRvU3RyaW5nKDM2KSArIChzdWZmaXggPyBzdWZmaXggOiAnJyk7IH1cblxuLy8gIEhlbHBlcnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gbm93KCl7XG4gICAgdmFyIHRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHZhciBsYXN0ID0gbm93Lmxhc3QgfHwgdGltZTtcbiAgICByZXR1cm4gbm93Lmxhc3QgPSB0aW1lID4gbGFzdCA/IHRpbWUgOiBsYXN0ICsgMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgaWQpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG5cbiAgICBnZXRUaXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gICAgfVxuXG4gICAgc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IG5ld1RpdGxlO1xuICAgIH1cblxuICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBzZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgZ2V0SWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH1cbn0iLCJpbXBvcnQgdW5pcWlkIGZyb20gJ3VuaXFpZCc7XG5pbXBvcnQgTm90ZSBmcm9tICcuL05vdGUnO1xuXG5jb25zdCBOb3RlVGFrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IG5vdGVzID0gW107XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlSW5kZXgoaWQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vdGVzW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Tm90ZShpZCkge1xuICAgICAgICByZXR1cm4gbm90ZXNbZ2V0Tm90ZUluZGV4KGlkKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdE5vdGUoaWQsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCBub3RlID0gZ2V0Tm90ZShpZCk7XG4gICAgICAgIG5vdGUuc2V0VGl0bGUobmV3VGl0bGUpO1xuICAgICAgICBub3RlLnNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVOb3RlKGlkKSB7XG4gICAgICAgIG5vdGVzLnNwbGljZShnZXROb3RlSW5kZXgoaWQpLDEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vdGUodGl0bGUsIGRlc2NyaXB0aW9uLCBpZD11bmlxaWQoKSkge1xuICAgICAgICBub3Rlcy5wdXNoKG5ldyBOb3RlKHRpdGxlLCBkZXNjcmlwdGlvbiwgaWQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlcygpIHtcbiAgICAgICAgcmV0dXJuIG5vdGVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE5vdGVzKG5ld05vdGVzKSB7XG4gICAgICAgIG5vdGVzID0gbmV3Tm90ZXM7XG4gICAgfSBcblxuICAgIHJldHVybiB7ZWRpdE5vdGUsIGRlbGV0ZU5vdGUsIGNyZWF0ZU5vdGUsIGdldE5vdGUsIGdldE5vdGVzLCBzZXROb3Rlc307XG59KSgpO1xuXG5leHBvcnQge05vdGVUYWtlcn07IiwiaW1wb3J0IHtOb3RlVGFrZXJ9IGZyb20gXCIuL05vdGVUYWtlclwiO1xuaW1wb3J0IE5vdGUgZnJvbSBcIi4vTm90ZVwiO1xuXG5jb25zdCBVSSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlSFRNTChub3RlVGl0bGUsIG5vdGVEZXNjcmlwdGlvbiwgbm90ZUlkKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdub3RlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPScke25vdGVJZH0nIGNsYXNzPSdub3RlLWJ1dHRvbi1jb250YWluZXInPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdlZGl0LW5vdGUtYnV0dG9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9J2VkaXQtbm90ZS1idXR0b24taWNvbicgc3JjPScuL2ltYWdlcy9lZGl0ICgxKS5wbmcnIGFsdD0nZWRpdCBub3RlIGljb24nPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsZXRlLW5vdGUtYnV0dG9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9J2RlbGV0ZS1ub3RlLWJ1dHRvbi1pY29uJ3NyYz0nLi9pbWFnZXMvZGVsZXRlLnBuZycgYWx0PSdkZWxldGUgbm90ZSBpY29uJz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPSdub3RlLXRpdGxlJz4ke25vdGVUaXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPSdub3RlLWRlc2NyaXB0aW9uJz4ke25vdGVEZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxOb3Rlc0hUTUwoKSB7XG4gICAgICAgIGxldCBub3Rlc0hUTUwgPSAnJztcbiAgICAgICAgTm90ZVRha2VyLmdldE5vdGVzKCkuZm9yRWFjaChub3RlID0+IHtcbiAgICAgICAgICAgIG5vdGVzSFRNTCArPSBnZXROb3RlSFRNTChub3RlLmdldFRpdGxlKCksIG5vdGUuZ2V0RGVzY3JpcHRpb24oKSwgbm90ZS5nZXRJZCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub3Rlc0hUTUw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyTm90ZXMoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGVzLWNvbnRhaW5lcicpO1xuICAgICAgICBub3Rlc0NvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRBbGxOb3Rlc0hUTUwoKSArIGdldENyZWF0ZU5ld05vdGVDYXJkSFRNTCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENyZWF0ZU5ld05vdGVDYXJkSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J25vdGUgY3JlYXRlLW5vdGUtY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY3JlYXRlLW5vdGUtYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjcmVhdGUtbm90ZS1idXR0b24taWNvblwiIHNyYz1cIi4vaW1hZ2VzL2FkZC5wbmdcIiBhbHQ9XCJhZGQgbm90ZSBpY29uXCI+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgICAgICBOb3RlVGFrZXIuY3JlYXRlTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgICAgICByZW5kZXJOb3RlcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGlkKSB7XG4gICAgICAgIE5vdGVUYWtlci5kZWxldGVOb3RlKGlkKTtcbiAgICAgICAgcmVuZGVyTm90ZXMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlZGl0Tm90ZUFuZFJlbmRlck5ld1NldE9mTm90ZXMobmV3VGl0bGUsIG5ld0Rlc2NyaXB0aW9uLCBpZCkge1xuICAgICAgICBOb3RlVGFrZXIuZWRpdE5vdGUoaWQsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbik7XG4gICAgICAgIHJlbmRlck5vdGVzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRm9ybShmb3JtQ2xhc3MsIHRhc2tJZD0nJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5uZXJIVE1MICs9IGdldEZvcm1IVE1MKGZvcm1DbGFzcywgdGFza0lkKTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBmb3JtQ2xhc3MgPT09ICdjcmVhdGUtbm90ZS1mb3JtJyA/IGhhbmRsZUNyZWF0ZU5ld05vdGVGb3JtU3VibWl0IDogaGFuZGxlRWRpdE5vdGVGb3JtU3VibWl0O1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyVG9Gb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2Zvcm1DbGFzc31gKSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1IVE1MKGZvcm1DbGFzcywgdGFza0lkKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBOb3RlVGFrZXIuZ2V0Tm90ZSh0YXNrSWQpO1xuICAgICAgICBjb25zdCBpbnB1dFRpdGxlVmFsdWUgPSBmb3JtQ2xhc3MgPT09ICdlZGl0LW5vdGUtZm9ybScgPyBub3RlLmdldFRpdGxlKCkgOiAnJztcbiAgICAgICAgY29uc3QgaW5wdXREZXNjcmlwdGlvblZhbHVlID0gZm9ybUNsYXNzID09PSAnZWRpdC1ub3RlLWZvcm0nID8gbm90ZS5nZXREZXNjcmlwdGlvbigpIDogJyc7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1tb2RhbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cIiR7Zm9ybUNsYXNzfSBub3RlLWZvcm1cIiBpZD0ke3Rhc2tJZH0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJub3RlLXRpdGxlLWlucHV0XCIgbmFtZT1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJ0aXRsZVwiIHZhbHVlPVwiJHtpbnB1dFRpdGxlVmFsdWV9XCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwibm90ZS1kZXNjcmlwdGlvbi1pbnB1dFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb24uLi5cIj4ke2lucHV0RGVzY3JpcHRpb25WYWx1ZX08L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic3VibWl0LW5vdGUtYnV0dG9uXCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRm9ybSgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW1vZGFsLWNvbnRhaW5lcicpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyVG9Gb3JtKGZvcm0sIGNhbGxiYWNrKSB7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZU5ld05vdGVGb3JtU3VibWl0KCkge1xuICAgICAgICBjcmVhdGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3Rlcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS10aXRsZS1pbnB1dCcpLnZhbHVlLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS1kZXNjcmlwdGlvbi1pbnB1dCcpLnZhbHVlKTtcbiAgICAgICAgcmVtb3ZlRm9ybSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUVkaXROb3RlRm9ybVN1Ym1pdChlKSB7XG4gICAgICAgIGVkaXROb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3Rlcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS10aXRsZS1pbnB1dCcpLnZhbHVlLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS1kZXNjcmlwdGlvbi1pbnB1dCcpLnZhbHVlLCBlLnRhcmdldC5pZCk7XG4gICAgICAgIHJlbW92ZUZvcm0oKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbm90ZS1idXR0b24nKSkge1xuICAgICAgICAgICAgcmVuZGVyRm9ybSgnZWRpdC1ub3RlLWZvcm0nLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbm90ZS1idXR0b24taWNvbicpKSB7XG4gICAgICAgICAgICByZW5kZXJGb3JtKCdlZGl0LW5vdGUtZm9ybScsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtbm90ZS1idXR0b24nKSkge1xuICAgICAgICAgICAgZGVsZXRlTm90ZUFuZFJlbmRlck5ld1NldE9mTm90ZXMoZS50YXJnZXQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtbm90ZS1idXR0b24taWNvbicpKSB7XG4gICAgICAgICAgICBkZWxldGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3RlcyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY3JlYXRlLW5vdGUtY29udGFpbmVyJykgfHwgXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcmVhdGUtbm90ZS1idXR0b24nKSB8fCBcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NyZWF0ZS1ub3RlLWJ1dHRvbi1pY29uJykpIHtcbiAgICAgICAgICAgIHJlbmRlckZvcm0oJ2NyZWF0ZS1ub3RlLWZvcm0nKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4ge3JlbmRlck5vdGVzfTtcbn0pKCk7XG5cbmV4cG9ydCB7VUl9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1VJfSBmcm9tIFwiLi9VSVwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1VJLnJlbmRlck5vdGVzKCl9KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=