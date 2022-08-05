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
                <div id='${noteId}'>
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
                <form class="${formClass}" id=${taskId} onsubmit="return false">
                    <input type="text" class="note-title-input" name="title" placeholder="title" value="${inputTitleValue}"></input>
                    <input type="text" class="note-description-input" name="description" placeholder="description..." value="${inputDescriptionValue}">
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LmpzIiwid2VicGFjazovL25vdGUtdGFrZXIvLi9zcmMvTm90ZS5qcyIsIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vc3JjL05vdGVUYWtlci5qcyIsIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vc3JjL1VJLmpzIiwid2VicGFjazovL25vdGUtdGFrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ub3RlLXRha2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ub3RlLXRha2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25vdGUtdGFrZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogXG4oVGhlIE1JVCBMaWNlbnNlKVxuQ29weXJpZ2h0IChjKSAyMDE0LTIwMjEgSGFsw6FzeiDDgWTDoW0gPGFkYW1AYWltZm9ybS5jb20+XG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vICBVbmlxdWUgSGV4YXRyaWRlY2ltYWwgSUQgR2VuZXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gIERlcGVuZGVuY2llc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG52YXIgcGlkID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MucGlkID8gcHJvY2Vzcy5waWQudG9TdHJpbmcoMzYpIDogJycgO1xudmFyIGFkZHJlc3MgPSAnJztcbmlmKHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyl7XG4gICAgdmFyIG1hYyA9ICcnLCBvcyA9IHJlcXVpcmUoJ29zJyk7IFxuICAgIGlmKG9zLm5ldHdvcmtJbnRlcmZhY2VzKSB2YXIgbmV0d29ya0ludGVyZmFjZXMgPSBvcy5uZXR3b3JrSW50ZXJmYWNlcygpO1xuICAgIGlmKG5ldHdvcmtJbnRlcmZhY2VzKXtcbiAgICAgICAgbG9vcDpcbiAgICAgICAgZm9yKGxldCBpbnRlcmZhY2Vfa2V5IGluIG5ldHdvcmtJbnRlcmZhY2VzKXtcbiAgICAgICAgICAgIGNvbnN0IG5ldHdvcmtJbnRlcmZhY2UgPSBuZXR3b3JrSW50ZXJmYWNlc1tpbnRlcmZhY2Vfa2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IG5ldHdvcmtJbnRlcmZhY2UubGVuZ3RoO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZihuZXR3b3JrSW50ZXJmYWNlW2ldICE9PSB1bmRlZmluZWQgJiYgbmV0d29ya0ludGVyZmFjZVtpXS5tYWMgJiYgbmV0d29ya0ludGVyZmFjZVtpXS5tYWMgIT0gJzAwOjAwOjAwOjAwOjAwOjAwJyl7XG4gICAgICAgICAgICAgICAgICAgIG1hYyA9IG5ldHdvcmtJbnRlcmZhY2VbaV0ubWFjOyBicmVhayBsb29wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzID0gbWFjID8gcGFyc2VJbnQobWFjLnJlcGxhY2UoL1xcOnxcXEQrL2dpLCAnJykpLnRvU3RyaW5nKDM2KSA6ICcnIDtcbiAgICB9XG59IFxuXG4vLyAgRXhwb3J0c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbihwcmVmaXgsIHN1ZmZpeCl7IHJldHVybiAocHJlZml4ID8gcHJlZml4IDogJycpICsgYWRkcmVzcyArIHBpZCArIG5vdygpLnRvU3RyaW5nKDM2KSArIChzdWZmaXggPyBzdWZmaXggOiAnJyk7IH1cbm1vZHVsZS5leHBvcnRzLnByb2Nlc3MgPSBmdW5jdGlvbihwcmVmaXgsIHN1ZmZpeCl7IHJldHVybiAocHJlZml4ID8gcHJlZml4IDogJycpICsgcGlkICsgbm93KCkudG9TdHJpbmcoMzYpICsgKHN1ZmZpeCA/IHN1ZmZpeCA6ICcnKTsgfVxubW9kdWxlLmV4cG9ydHMudGltZSAgICA9IGZ1bmN0aW9uKHByZWZpeCwgc3VmZml4KXsgcmV0dXJuIChwcmVmaXggPyBwcmVmaXggOiAnJykgKyBub3coKS50b1N0cmluZygzNikgKyAoc3VmZml4ID8gc3VmZml4IDogJycpOyB9XG5cbi8vICBIZWxwZXJzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIG5vdygpe1xuICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgbGFzdCA9IG5vdy5sYXN0IHx8IHRpbWU7XG4gICAgcmV0dXJuIG5vdy5sYXN0ID0gdGltZSA+IGxhc3QgPyB0aW1lIDogbGFzdCArIDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RlIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGlkKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgZ2V0VGl0bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICAgIH1cblxuICAgIHNldFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcbiAgICB9XG5cbiAgICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9XG59IiwiaW1wb3J0IHVuaXFpZCBmcm9tICd1bmlxaWQnO1xuaW1wb3J0IE5vdGUgZnJvbSAnLi9Ob3RlJztcblxuY29uc3QgTm90ZVRha2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGxldCBub3RlcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZ2V0Tm90ZUluZGV4KGlkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChub3Rlc1tpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE5vdGUoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5vdGVzW2dldE5vdGVJbmRleChpZCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVkaXROb3RlKGlkLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24pIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IGdldE5vdGUoaWQpO1xuICAgICAgICBub3RlLnNldFRpdGxlKG5ld1RpdGxlKTtcbiAgICAgICAgbm90ZS5zZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlTm90ZShpZCkge1xuICAgICAgICBub3Rlcy5zcGxpY2UoZ2V0Tm90ZUluZGV4KGlkKSwxKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVOb3RlKHRpdGxlLCBkZXNjcmlwdGlvbiwgaWQ9dW5pcWlkKCkpIHtcbiAgICAgICAgbm90ZXMucHVzaChuZXcgTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGlkKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Tm90ZXMoKSB7XG4gICAgICAgIHJldHVybiBub3RlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXROb3RlcyhuZXdOb3Rlcykge1xuICAgICAgICBub3RlcyA9IG5ld05vdGVzO1xuICAgIH0gXG5cbiAgICByZXR1cm4ge2VkaXROb3RlLCBkZWxldGVOb3RlLCBjcmVhdGVOb3RlLCBnZXROb3RlLCBnZXROb3Rlcywgc2V0Tm90ZXN9O1xufSkoKTtcblxuZXhwb3J0IHtOb3RlVGFrZXJ9OyIsImltcG9ydCB7Tm90ZVRha2VyfSBmcm9tIFwiLi9Ob3RlVGFrZXJcIjtcbmltcG9ydCBOb3RlIGZyb20gXCIuL05vdGVcIjtcblxuY29uc3QgVUkgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gZ2V0Tm90ZUhUTUwobm90ZVRpdGxlLCBub3RlRGVzY3JpcHRpb24sIG5vdGVJZCkge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nbm90ZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nJHtub3RlSWR9Jz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZWRpdC1ub3RlLWJ1dHRvbic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPSdlZGl0LW5vdGUtYnV0dG9uLWljb24nIHNyYz0nLi9pbWFnZXMvZWRpdCAoMSkucG5nJyBhbHQ9J2VkaXQgbm90ZSBpY29uJz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2RlbGV0ZS1ub3RlLWJ1dHRvbic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPSdkZWxldGUtbm90ZS1idXR0b24taWNvbidzcmM9Jy4vaW1hZ2VzL2RlbGV0ZS5wbmcnIGFsdD0nZGVsZXRlIG5vdGUgaWNvbic+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz0nbm90ZS10aXRsZSc+JHtub3RlVGl0bGV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz0nbm90ZS1kZXNjcmlwdGlvbic+JHtub3RlRGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsTm90ZXNIVE1MKCkge1xuICAgICAgICBsZXQgbm90ZXNIVE1MID0gJyc7XG4gICAgICAgIE5vdGVUYWtlci5nZXROb3RlcygpLmZvckVhY2gobm90ZSA9PiB7XG4gICAgICAgICAgICBub3Rlc0hUTUwgKz0gZ2V0Tm90ZUhUTUwobm90ZS5nZXRUaXRsZSgpLCBub3RlLmdldERlc2NyaXB0aW9uKCksIG5vdGUuZ2V0SWQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbm90ZXNIVE1MO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlck5vdGVzKCkge1xuICAgICAgICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3Rlcy1jb250YWluZXInKTtcbiAgICAgICAgbm90ZXNDb250YWluZXIuaW5uZXJIVE1MID0gZ2V0QWxsTm90ZXNIVE1MKCkgKyBnZXRDcmVhdGVOZXdOb3RlQ2FyZEhUTUwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDcmVhdGVOZXdOb3RlQ2FyZEhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdub3RlIGNyZWF0ZS1ub3RlLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNyZWF0ZS1ub3RlLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY3JlYXRlLW5vdGUtYnV0dG9uLWljb25cIiBzcmM9XCIuL2ltYWdlcy9hZGQucG5nXCIgYWx0PVwiYWRkIG5vdGUgaWNvblwiPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3Rlcyh0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgTm90ZVRha2VyLmNyZWF0ZU5vdGUodGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgcmVuZGVyTm90ZXMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3RlcyhpZCkge1xuICAgICAgICBOb3RlVGFrZXIuZGVsZXRlTm90ZShpZCk7XG4gICAgICAgIHJlbmRlck5vdGVzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdE5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbiwgaWQpIHtcbiAgICAgICAgTm90ZVRha2VyLmVkaXROb3RlKGlkLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24pO1xuICAgICAgICByZW5kZXJOb3RlcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckZvcm0oZm9ybUNsYXNzLCB0YXNrSWQ9JycpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmlubmVySFRNTCArPSBnZXRGb3JtSFRNTChmb3JtQ2xhc3MsIHRhc2tJZCk7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gZm9ybUNsYXNzID09PSAnY3JlYXRlLW5vdGUtZm9ybScgPyBoYW5kbGVDcmVhdGVOZXdOb3RlRm9ybVN1Ym1pdCA6IGhhbmRsZUVkaXROb3RlRm9ybVN1Ym1pdDtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lclRvRm9ybShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtmb3JtQ2xhc3N9YCksIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtSFRNTChmb3JtQ2xhc3MsIHRhc2tJZCkge1xuICAgICAgICBjb25zdCBub3RlID0gTm90ZVRha2VyLmdldE5vdGUodGFza0lkKTtcbiAgICAgICAgY29uc3QgaW5wdXRUaXRsZVZhbHVlID0gZm9ybUNsYXNzID09PSAnZWRpdC1ub3RlLWZvcm0nID8gbm90ZS5nZXRUaXRsZSgpIDogJyc7XG4gICAgICAgIGNvbnN0IGlucHV0RGVzY3JpcHRpb25WYWx1ZSA9IGZvcm1DbGFzcyA9PT0gJ2VkaXQtbm90ZS1mb3JtJyA/IG5vdGUuZ2V0RGVzY3JpcHRpb24oKSA6ICcnO1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tbW9kYWwtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCIke2Zvcm1DbGFzc31cIiBpZD0ke3Rhc2tJZH0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJub3RlLXRpdGxlLWlucHV0XCIgbmFtZT1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJ0aXRsZVwiIHZhbHVlPVwiJHtpbnB1dFRpdGxlVmFsdWV9XCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJub3RlLWRlc2NyaXB0aW9uLWlucHV0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvbi4uLlwiIHZhbHVlPVwiJHtpbnB1dERlc2NyaXB0aW9uVmFsdWV9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzdWJtaXQtbm90ZS1idXR0b25cIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGb3JtKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbW9kYWwtY29udGFpbmVyJykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJUb0Zvcm0oZm9ybSwgY2FsbGJhY2spIHtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlTmV3Tm90ZUZvcm1TdWJtaXQoKSB7XG4gICAgICAgIGNyZWF0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RlLXRpdGxlLWlucHV0JykudmFsdWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RlLWRlc2NyaXB0aW9uLWlucHV0JykudmFsdWUpO1xuICAgICAgICByZW1vdmVGb3JtKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRWRpdE5vdGVGb3JtU3VibWl0KGUpIHtcbiAgICAgICAgZWRpdE5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RlLXRpdGxlLWlucHV0JykudmFsdWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RlLWRlc2NyaXB0aW9uLWlucHV0JykudmFsdWUsIGUudGFyZ2V0LmlkKTtcbiAgICAgICAgcmVtb3ZlRm9ybSgpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1ub3RlLWJ1dHRvbicpKSB7XG4gICAgICAgICAgICByZW5kZXJGb3JtKCdlZGl0LW5vdGUtZm9ybScsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1ub3RlLWJ1dHRvbi1pY29uJykpIHtcbiAgICAgICAgICAgIHJlbmRlckZvcm0oJ2VkaXQtbm90ZS1mb3JtJywgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1ub3RlLWJ1dHRvbicpKSB7XG4gICAgICAgICAgICBkZWxldGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3RlcyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1ub3RlLWJ1dHRvbi1pY29uJykpIHtcbiAgICAgICAgICAgIGRlbGV0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcmVhdGUtbm90ZS1jb250YWluZXInKSB8fCBcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NyZWF0ZS1ub3RlLWJ1dHRvbicpIHx8IFxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY3JlYXRlLW5vdGUtYnV0dG9uLWljb24nKSkge1xuICAgICAgICAgICAgcmVuZGVyRm9ybSgnY3JlYXRlLW5vdGUtZm9ybScpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiB7cmVuZGVyTm90ZXN9O1xufSkoKTtcblxuZXhwb3J0IHtVSX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7VUl9IGZyb20gXCIuL1VJXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7VUkucmVuZGVyTm90ZXMoKX0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==