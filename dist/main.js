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
    createNote('note example', 'do something on this day');

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
        const noteIndex = getNoteIndex(id);
        notes.splice(noteIndex,1);
    }

    function createNote(title, description, id=uniqid__WEBPACK_IMPORTED_MODULE_0___default()()) {
        const note = new _Note__WEBPACK_IMPORTED_MODULE_1__["default"](title, description, id);
        notes.push(note);
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
                    <button class='edit-note'><img class='edit-note' src='./images/edit (1).png' alt='edit note icon'></button>
                    <button class='delete-note'><img class='delete-note' src='./images/delete.png' alt='delete note icon'></button>
                </div>
                <h2 class='note-title'>${noteTitle}</h2>
                <p class='note-description'>${noteDescription}</p>
            </div>
        `
    }

    function getAllNotesHTML() {
        const notes = _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.getNotes();
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
        _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.createNote(title, description)
    }

    function createNoteAndRenderNewSetOfNotes(title, description) {
        createNote(title, description);
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
        addEventListenerToForm(formClass);
    }

    function getFormHTML(formClass, taskId) {
        let inputTitleStr;
        let inputDescriptionStr;
        if (formClass === 'edit-note-form') {
            const note = _NoteTaker__WEBPACK_IMPORTED_MODULE_0__.NoteTaker.getNote(taskId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0I7O0FBRXhCLHFEQUFxRCwrQ0FBYyxHQUFHLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vbm9kZV9tb2R1bGVzL3VuaXFpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vc3JjL05vdGUuanMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci8uL3NyYy9Ob3RlVGFrZXIuanMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly9ub3RlLXRha2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vdGUtdGFrZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25vdGUtdGFrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFxuKFRoZSBNSVQgTGljZW5zZSlcbkNvcHlyaWdodCAoYykgMjAxNC0yMDIxIEhhbMOhc3ogw4Fkw6FtIDxhZGFtQGFpbWZvcm0uY29tPlxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4vLyAgVW5pcXVlIEhleGF0cmlkZWNpbWFsIElEIEdlbmVyYXRvclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vICBEZXBlbmRlbmNpZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIHBpZCA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnBpZCA/IHByb2Nlc3MucGlkLnRvU3RyaW5nKDM2KSA6ICcnIDtcbnZhciBhZGRyZXNzID0gJyc7XG5pZih0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgIHZhciBtYWMgPSAnJywgb3MgPSByZXF1aXJlKCdvcycpOyBcbiAgICBpZihvcy5uZXR3b3JrSW50ZXJmYWNlcykgdmFyIG5ldHdvcmtJbnRlcmZhY2VzID0gb3MubmV0d29ya0ludGVyZmFjZXMoKTtcbiAgICBpZihuZXR3b3JrSW50ZXJmYWNlcyl7XG4gICAgICAgIGxvb3A6XG4gICAgICAgIGZvcihsZXQgaW50ZXJmYWNlX2tleSBpbiBuZXR3b3JrSW50ZXJmYWNlcyl7XG4gICAgICAgICAgICBjb25zdCBuZXR3b3JrSW50ZXJmYWNlID0gbmV0d29ya0ludGVyZmFjZXNbaW50ZXJmYWNlX2tleV07XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBuZXR3b3JrSW50ZXJmYWNlLmxlbmd0aDtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYobmV0d29ya0ludGVyZmFjZVtpXSAhPT0gdW5kZWZpbmVkICYmIG5ldHdvcmtJbnRlcmZhY2VbaV0ubWFjICYmIG5ldHdvcmtJbnRlcmZhY2VbaV0ubWFjICE9ICcwMDowMDowMDowMDowMDowMCcpe1xuICAgICAgICAgICAgICAgICAgICBtYWMgPSBuZXR3b3JrSW50ZXJmYWNlW2ldLm1hYzsgYnJlYWsgbG9vcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWRkcmVzcyA9IG1hYyA/IHBhcnNlSW50KG1hYy5yZXBsYWNlKC9cXDp8XFxEKy9naSwgJycpKS50b1N0cmluZygzNikgOiAnJyA7XG4gICAgfVxufSBcblxuLy8gIEV4cG9ydHNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24ocHJlZml4LCBzdWZmaXgpeyByZXR1cm4gKHByZWZpeCA/IHByZWZpeCA6ICcnKSArIGFkZHJlc3MgKyBwaWQgKyBub3coKS50b1N0cmluZygzNikgKyAoc3VmZml4ID8gc3VmZml4IDogJycpOyB9XG5tb2R1bGUuZXhwb3J0cy5wcm9jZXNzID0gZnVuY3Rpb24ocHJlZml4LCBzdWZmaXgpeyByZXR1cm4gKHByZWZpeCA/IHByZWZpeCA6ICcnKSArIHBpZCArIG5vdygpLnRvU3RyaW5nKDM2KSArIChzdWZmaXggPyBzdWZmaXggOiAnJyk7IH1cbm1vZHVsZS5leHBvcnRzLnRpbWUgICAgPSBmdW5jdGlvbihwcmVmaXgsIHN1ZmZpeCl7IHJldHVybiAocHJlZml4ID8gcHJlZml4IDogJycpICsgbm93KCkudG9TdHJpbmcoMzYpICsgKHN1ZmZpeCA/IHN1ZmZpeCA6ICcnKTsgfVxuXG4vLyAgSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBub3coKXtcbiAgICB2YXIgdGltZSA9IERhdGUubm93KCk7XG4gICAgdmFyIGxhc3QgPSBub3cubGFzdCB8fCB0aW1lO1xuICAgIHJldHVybiBub3cubGFzdCA9IHRpbWUgPiBsYXN0ID8gdGltZSA6IGxhc3QgKyAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90ZSB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBpZCkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cblxuICAgIGdldFRpdGxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgICB9XG5cbiAgICBzZXRUaXRsZShuZXdUaXRsZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxufSIsImltcG9ydCB1bmlxaWQgZnJvbSAndW5pcWlkJztcbmltcG9ydCBOb3RlIGZyb20gJy4vTm90ZSc7XG5cbmNvbnN0IE5vdGVUYWtlciA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgbm90ZXMgPSBbXTtcbiAgICBjcmVhdGVOb3RlKCdub3RlIGV4YW1wbGUnLCAnZG8gc29tZXRoaW5nIG9uIHRoaXMgZGF5Jyk7XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlSW5kZXgoaWQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vdGVzW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Tm90ZShpZCkge1xuICAgICAgICByZXR1cm4gbm90ZXNbZ2V0Tm90ZUluZGV4KGlkKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdE5vdGUoaWQsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCBub3RlID0gZ2V0Tm90ZShpZCk7XG4gICAgICAgIG5vdGUuc2V0VGl0bGUobmV3VGl0bGUpO1xuICAgICAgICBub3RlLnNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVOb3RlKGlkKSB7XG4gICAgICAgIGNvbnN0IG5vdGVJbmRleCA9IGdldE5vdGVJbmRleChpZCk7XG4gICAgICAgIG5vdGVzLnNwbGljZShub3RlSW5kZXgsMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGlkPXVuaXFpZCgpKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBuZXcgTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGlkKTtcbiAgICAgICAgbm90ZXMucHVzaChub3RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlcygpIHtcbiAgICAgICAgcmV0dXJuIG5vdGVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE5vdGVzKG5ld05vdGVzKSB7XG4gICAgICAgIG5vdGVzID0gbmV3Tm90ZXM7XG4gICAgfSBcblxuICAgIHJldHVybiB7ZWRpdE5vdGUsIGRlbGV0ZU5vdGUsIGNyZWF0ZU5vdGUsIGdldE5vdGUsIGdldE5vdGVzLCBzZXROb3Rlc307XG59KSgpO1xuXG5leHBvcnQge05vdGVUYWtlcn07IiwiaW1wb3J0IHtOb3RlVGFrZXJ9IGZyb20gXCIuL05vdGVUYWtlclwiO1xuaW1wb3J0IE5vdGUgZnJvbSBcIi4vTm90ZVwiO1xuXG5jb25zdCBVSSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlSFRNTChub3RlVGl0bGUsIG5vdGVEZXNjcmlwdGlvbiwgbm90ZUlkKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdub3RlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPScke25vdGVJZH0nPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdlZGl0LW5vdGUnPjxpbWcgY2xhc3M9J2VkaXQtbm90ZScgc3JjPScuL2ltYWdlcy9lZGl0ICgxKS5wbmcnIGFsdD0nZWRpdCBub3RlIGljb24nPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWxldGUtbm90ZSc+PGltZyBjbGFzcz0nZGVsZXRlLW5vdGUnIHNyYz0nLi9pbWFnZXMvZGVsZXRlLnBuZycgYWx0PSdkZWxldGUgbm90ZSBpY29uJz48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9J25vdGUtdGl0bGUnPiR7bm90ZVRpdGxlfTwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9J25vdGUtZGVzY3JpcHRpb24nPiR7bm90ZURlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsTm90ZXNIVE1MKCkge1xuICAgICAgICBjb25zdCBub3RlcyA9IE5vdGVUYWtlci5nZXROb3RlcygpO1xuICAgICAgICBsZXQgbm90ZXNIVE1MID0gJyc7XG4gICAgICAgIG5vdGVzLmZvckVhY2gobm90ZSA9PiB7XG4gICAgICAgICAgICBub3Rlc0hUTUwgKz0gZ2V0Tm90ZUhUTUwobm90ZS5nZXRUaXRsZSgpLCBub3RlLmdldERlc2NyaXB0aW9uKCksIG5vdGUuZ2V0SWQoKSk7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBub3Rlc0hUTUw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyTm90ZXMoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGVzLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBub3Rlc0hUTUwgPSBnZXRBbGxOb3Rlc0hUTUwoKTtcbiAgICAgICAgY29uc3QgYWRkTm90ZUNhcmQgPSAnPGRpdj48YnV0dG9uIGNsYXNzPVwiY3JlYXRlLW5vdGUtY2FyZFwiPjxpbWcgY2xhc3M9XCJjcmVhdGUtbm90ZS1jYXJkLWljb25cIiBzcmM9XCIuL2ltYWdlcy9hZGQucG5nXCIgYWx0PVwiYWRkIG5vdGUgaWNvblwiPjwvYnV0dG9uPjwvZGl2Pic7XG4gICAgICAgIG5vdGVzQ29udGFpbmVyLmlubmVySFRNTCA9IG5vdGVzSFRNTCArIGFkZE5vdGVDYXJkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vdGUodGl0bGUsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIE5vdGVUYWtlci5jcmVhdGVOb3RlKHRpdGxlLCBkZXNjcmlwdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3Rlcyh0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgY3JlYXRlTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgICAgICByZW5kZXJOb3RlcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGlkKSB7XG4gICAgICAgIE5vdGVUYWtlci5kZWxldGVOb3RlKGlkKTtcbiAgICAgICAgcmVuZGVyTm90ZXMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlZGl0Tm90ZUFuZFJlbmRlck5ld1NldE9mTm90ZXMobmV3VGl0bGUsIG5ld0Rlc2NyaXB0aW9uLCBpZCkge1xuICAgICAgICBOb3RlVGFrZXIuZWRpdE5vdGUoaWQsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbik7XG4gICAgICAgIHJlbmRlck5vdGVzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRm9ybShmb3JtQ2xhc3MsIHRhc2tJZD0nJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5uZXJIVE1MICs9IGdldEZvcm1IVE1MKGZvcm1DbGFzcywgdGFza0lkKTtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lclRvRm9ybShmb3JtQ2xhc3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1IVE1MKGZvcm1DbGFzcywgdGFza0lkKSB7XG4gICAgICAgIGxldCBpbnB1dFRpdGxlU3RyO1xuICAgICAgICBsZXQgaW5wdXREZXNjcmlwdGlvblN0cjtcbiAgICAgICAgaWYgKGZvcm1DbGFzcyA9PT0gJ2VkaXQtbm90ZS1mb3JtJykge1xuICAgICAgICAgICAgY29uc3Qgbm90ZSA9IE5vdGVUYWtlci5nZXROb3RlKHRhc2tJZCk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZVZhbHVlID0gbm90ZS5nZXRUaXRsZSgpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25WYWx1ZSA9IG5vdGUuZ2V0RGVzY3JpcHRpb24oKTtcbiAgICAgICAgICAgIGlucHV0VGl0bGVTdHIgPSBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJub3RlLXRpdGxlLWlucHV0XCIgbmFtZT1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJ0aXRsZVwiIHZhbHVlPScke3RpdGxlVmFsdWV9Jz48L2lucHV0PmA7XG4gICAgICAgICAgICBpbnB1dERlc2NyaXB0aW9uU3RyID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibm90ZS1kZXNjcmlwdGlvbi1pbnB1dFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb24uLi5cIiB2YWx1ZT0nJHtkZXNjcmlwdGlvblZhbHVlfSc+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0VGl0bGVTdHIgPSBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJub3RlLXRpdGxlLWlucHV0XCIgbmFtZT1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJ0aXRsZVwiPjwvaW5wdXQ+YDtcbiAgICAgICAgICAgIGlucHV0RGVzY3JpcHRpb25TdHIgPSBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJub3RlLWRlc2NyaXB0aW9uLWlucHV0XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvbi4uLlwiPmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLW1vZGFsLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiJHtmb3JtQ2xhc3N9XCIgaWQ9JHt0YXNrSWR9IG9uc3VibWl0PVwicmV0dXJuIGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICR7aW5wdXRUaXRsZVN0cn1cbiAgICAgICAgICAgICAgICAgICAgJHtpbnB1dERlc2NyaXB0aW9uU3RyfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic3VibWl0LW5vdGUtYnV0dG9uXCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRm9ybSgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW1vZGFsLWNvbnRhaW5lcicpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyVG9Gb3JtKGZvcm1DbGFzcykge1xuICAgICAgICBpZiAoZm9ybUNsYXNzID09PSAnY3JlYXRlLW5vdGUtZm9ybScpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGUtbm90ZS1mb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RlLXRpdGxlLWlucHV0JykudmFsdWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RlLWRlc2NyaXB0aW9uLWlucHV0JykudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUZvcm0oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybUNsYXNzID09PSAnZWRpdC1ub3RlLWZvcm0nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC1ub3RlLWZvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGVkaXROb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3Rlcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS10aXRsZS1pbnB1dCcpLnZhbHVlLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS1kZXNjcmlwdGlvbi1pbnB1dCcpLnZhbHVlLCBlLnRhcmdldC5pZCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRm9ybSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY3JlYXRlLW5vdGUtY2FyZCcpIHx8IChlLnRhcmdldC5wYXJlbnRFbGVtZW50ICE9PSBudWxsICYmIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcmVhdGUtbm90ZS1jYXJkJykpKSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LW5vdGUnKSkge1xuICAgICAgICAgICAgICAgIHJlbmRlckZvcm0oJ2NyZWF0ZS1ub3RlLWZvcm0nLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyRm9ybSgnY3JlYXRlLW5vdGUtZm9ybScsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LW5vdGUnKSB8fCAoZS50YXJnZXQucGFyZW50RWxlbWVudCAhPT0gbnVsbCAmJiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1ub3RlJykpKSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LW5vdGUnKSkge1xuICAgICAgICAgICAgICAgIHJlbmRlckZvcm0oJ2VkaXQtbm90ZS1mb3JtJywgZS50YXJnZXQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbmRlckZvcm0oJ2VkaXQtbm90ZS1mb3JtJywgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1ub3RlJykgfHwgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IG51bGwgJiYgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1ub3RlJykpKSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtbm90ZScpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlTm90ZUFuZFJlbmRlck5ld1NldE9mTm90ZXMoZS50YXJnZXQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHtyZW5kZXJOb3Rlc307XG59KSgpO1xuXG5leHBvcnQge1VJfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtVSX0gZnJvbSBcIi4vVUlcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtVSS5yZW5kZXJOb3RlcygpfSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9