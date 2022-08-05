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
                    <button class='edit-note'><img src='./images/edit (1).png' alt='edit note icon'></button>
                    <button class='delete-note'><img src='./images/delete.png' alt='delete note icon'></button>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0I7O0FBRXhCLHFEQUFxRCwrQ0FBYyxHQUFHLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vbm9kZV9tb2R1bGVzL3VuaXFpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vc3JjL05vdGUuanMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci8uL3NyYy9Ob3RlVGFrZXIuanMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly9ub3RlLXRha2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vdGUtdGFrZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbm90ZS10YWtlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25vdGUtdGFrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ub3RlLXRha2VyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFxuKFRoZSBNSVQgTGljZW5zZSlcbkNvcHlyaWdodCAoYykgMjAxNC0yMDIxIEhhbMOhc3ogw4Fkw6FtIDxhZGFtQGFpbWZvcm0uY29tPlxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4vLyAgVW5pcXVlIEhleGF0cmlkZWNpbWFsIElEIEdlbmVyYXRvclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vICBEZXBlbmRlbmNpZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIHBpZCA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnBpZCA/IHByb2Nlc3MucGlkLnRvU3RyaW5nKDM2KSA6ICcnIDtcbnZhciBhZGRyZXNzID0gJyc7XG5pZih0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgIHZhciBtYWMgPSAnJywgb3MgPSByZXF1aXJlKCdvcycpOyBcbiAgICBpZihvcy5uZXR3b3JrSW50ZXJmYWNlcykgdmFyIG5ldHdvcmtJbnRlcmZhY2VzID0gb3MubmV0d29ya0ludGVyZmFjZXMoKTtcbiAgICBpZihuZXR3b3JrSW50ZXJmYWNlcyl7XG4gICAgICAgIGxvb3A6XG4gICAgICAgIGZvcihsZXQgaW50ZXJmYWNlX2tleSBpbiBuZXR3b3JrSW50ZXJmYWNlcyl7XG4gICAgICAgICAgICBjb25zdCBuZXR3b3JrSW50ZXJmYWNlID0gbmV0d29ya0ludGVyZmFjZXNbaW50ZXJmYWNlX2tleV07XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBuZXR3b3JrSW50ZXJmYWNlLmxlbmd0aDtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYobmV0d29ya0ludGVyZmFjZVtpXSAhPT0gdW5kZWZpbmVkICYmIG5ldHdvcmtJbnRlcmZhY2VbaV0ubWFjICYmIG5ldHdvcmtJbnRlcmZhY2VbaV0ubWFjICE9ICcwMDowMDowMDowMDowMDowMCcpe1xuICAgICAgICAgICAgICAgICAgICBtYWMgPSBuZXR3b3JrSW50ZXJmYWNlW2ldLm1hYzsgYnJlYWsgbG9vcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWRkcmVzcyA9IG1hYyA/IHBhcnNlSW50KG1hYy5yZXBsYWNlKC9cXDp8XFxEKy9naSwgJycpKS50b1N0cmluZygzNikgOiAnJyA7XG4gICAgfVxufSBcblxuLy8gIEV4cG9ydHNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24ocHJlZml4LCBzdWZmaXgpeyByZXR1cm4gKHByZWZpeCA/IHByZWZpeCA6ICcnKSArIGFkZHJlc3MgKyBwaWQgKyBub3coKS50b1N0cmluZygzNikgKyAoc3VmZml4ID8gc3VmZml4IDogJycpOyB9XG5tb2R1bGUuZXhwb3J0cy5wcm9jZXNzID0gZnVuY3Rpb24ocHJlZml4LCBzdWZmaXgpeyByZXR1cm4gKHByZWZpeCA/IHByZWZpeCA6ICcnKSArIHBpZCArIG5vdygpLnRvU3RyaW5nKDM2KSArIChzdWZmaXggPyBzdWZmaXggOiAnJyk7IH1cbm1vZHVsZS5leHBvcnRzLnRpbWUgICAgPSBmdW5jdGlvbihwcmVmaXgsIHN1ZmZpeCl7IHJldHVybiAocHJlZml4ID8gcHJlZml4IDogJycpICsgbm93KCkudG9TdHJpbmcoMzYpICsgKHN1ZmZpeCA/IHN1ZmZpeCA6ICcnKTsgfVxuXG4vLyAgSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBub3coKXtcbiAgICB2YXIgdGltZSA9IERhdGUubm93KCk7XG4gICAgdmFyIGxhc3QgPSBub3cubGFzdCB8fCB0aW1lO1xuICAgIHJldHVybiBub3cubGFzdCA9IHRpbWUgPiBsYXN0ID8gdGltZSA6IGxhc3QgKyAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90ZSB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBpZCkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cblxuICAgIGdldFRpdGxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgICB9XG5cbiAgICBzZXRUaXRsZShuZXdUaXRsZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxufSIsImltcG9ydCB1bmlxaWQgZnJvbSAndW5pcWlkJztcbmltcG9ydCBOb3RlIGZyb20gJy4vTm90ZSc7XG5cbmNvbnN0IE5vdGVUYWtlciA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgbm90ZXMgPSBbXTtcbiAgICBjcmVhdGVOb3RlKCdub3RlIGV4YW1wbGUnLCAnZG8gc29tZXRoaW5nIG9uIHRoaXMgZGF5Jyk7XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlSW5kZXgoaWQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vdGVzW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Tm90ZShpZCkge1xuICAgICAgICByZXR1cm4gbm90ZXNbZ2V0Tm90ZUluZGV4KGlkKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdE5vdGUoaWQsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCBub3RlID0gZ2V0Tm90ZShpZCk7XG4gICAgICAgIG5vdGUuc2V0VGl0bGUobmV3VGl0bGUpO1xuICAgICAgICBub3RlLnNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVOb3RlKGlkKSB7XG4gICAgICAgIGNvbnN0IG5vdGVJbmRleCA9IGdldE5vdGVJbmRleChpZCk7XG4gICAgICAgIG5vdGVzLnNwbGljZShub3RlSW5kZXgsMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGlkPXVuaXFpZCgpKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBuZXcgTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGlkKTtcbiAgICAgICAgbm90ZXMucHVzaChub3RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlcygpIHtcbiAgICAgICAgcmV0dXJuIG5vdGVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE5vdGVzKG5ld05vdGVzKSB7XG4gICAgICAgIG5vdGVzID0gbmV3Tm90ZXM7XG4gICAgfSBcblxuICAgIHJldHVybiB7ZWRpdE5vdGUsIGRlbGV0ZU5vdGUsIGNyZWF0ZU5vdGUsIGdldE5vdGUsIGdldE5vdGVzLCBzZXROb3Rlc307XG59KSgpO1xuXG5leHBvcnQge05vdGVUYWtlcn07IiwiaW1wb3J0IHtOb3RlVGFrZXJ9IGZyb20gXCIuL05vdGVUYWtlclwiO1xuaW1wb3J0IE5vdGUgZnJvbSBcIi4vTm90ZVwiO1xuXG5jb25zdCBVSSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBnZXROb3RlSFRNTChub3RlVGl0bGUsIG5vdGVEZXNjcmlwdGlvbiwgbm90ZUlkKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdub3RlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPScke25vdGVJZH0nPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdlZGl0LW5vdGUnPjxpbWcgc3JjPScuL2ltYWdlcy9lZGl0ICgxKS5wbmcnIGFsdD0nZWRpdCBub3RlIGljb24nPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWxldGUtbm90ZSc+PGltZyBzcmM9Jy4vaW1hZ2VzL2RlbGV0ZS5wbmcnIGFsdD0nZGVsZXRlIG5vdGUgaWNvbic+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPSdub3RlLXRpdGxlJz4ke25vdGVUaXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPSdub3RlLWRlc2NyaXB0aW9uJz4ke25vdGVEZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbE5vdGVzSFRNTCgpIHtcbiAgICAgICAgY29uc3Qgbm90ZXMgPSBOb3RlVGFrZXIuZ2V0Tm90ZXMoKTtcbiAgICAgICAgbGV0IG5vdGVzSFRNTCA9ICcnO1xuICAgICAgICBub3Rlcy5mb3JFYWNoKG5vdGUgPT4ge1xuICAgICAgICAgICAgbm90ZXNIVE1MICs9IGdldE5vdGVIVE1MKG5vdGUuZ2V0VGl0bGUoKSwgbm90ZS5nZXREZXNjcmlwdGlvbigpLCBub3RlLmdldElkKCkpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gbm90ZXNIVE1MO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlck5vdGVzKCkge1xuICAgICAgICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3Rlcy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgbm90ZXNIVE1MID0gZ2V0QWxsTm90ZXNIVE1MKCk7XG4gICAgICAgIGNvbnN0IGFkZE5vdGVDYXJkID0gJzxkaXY+PGJ1dHRvbiBjbGFzcz1cImNyZWF0ZS1ub3RlLWNhcmRcIj48aW1nIGNsYXNzPVwiY3JlYXRlLW5vdGUtY2FyZC1pY29uXCIgc3JjPVwiLi9pbWFnZXMvYWRkLnBuZ1wiIGFsdD1cImFkZCBub3RlIGljb25cIj48L2J1dHRvbj48L2Rpdj4nO1xuICAgICAgICBub3Rlc0NvbnRhaW5lci5pbm5lckhUTUwgPSBub3Rlc0hUTUwgKyBhZGROb3RlQ2FyZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVOb3RlKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgICAgICBOb3RlVGFrZXIuY3JlYXRlTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTm90ZUFuZFJlbmRlck5ld1NldE9mTm90ZXModGl0bGUsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNyZWF0ZU5vdGUodGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgcmVuZGVyTm90ZXMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3RlcyhpZCkge1xuICAgICAgICBOb3RlVGFrZXIuZGVsZXRlTm90ZShpZCk7XG4gICAgICAgIHJlbmRlck5vdGVzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdE5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbiwgaWQpIHtcbiAgICAgICAgTm90ZVRha2VyLmVkaXROb3RlKGlkLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24pO1xuICAgICAgICByZW5kZXJOb3RlcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckZvcm0oZm9ybUNsYXNzLCB0YXNrSWQ9JycpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmlubmVySFRNTCArPSBnZXRGb3JtSFRNTChmb3JtQ2xhc3MsIHRhc2tJZCk7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJUb0Zvcm0oZm9ybUNsYXNzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtSFRNTChmb3JtQ2xhc3MsIHRhc2tJZCkge1xuICAgICAgICBsZXQgaW5wdXRUaXRsZVN0cjtcbiAgICAgICAgbGV0IGlucHV0RGVzY3JpcHRpb25TdHI7XG4gICAgICAgIGlmIChmb3JtQ2xhc3MgPT09ICdlZGl0LW5vdGUtZm9ybScpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdGUgPSBOb3RlVGFrZXIuZ2V0Tm90ZSh0YXNrSWQpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGVWYWx1ZSA9IG5vdGUuZ2V0VGl0bGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsdWUgPSBub3RlLmdldERlc2NyaXB0aW9uKCk7XG4gICAgICAgICAgICBpbnB1dFRpdGxlU3RyID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibm90ZS10aXRsZS1pbnB1dFwiIG5hbWU9XCJ0aXRsZVwiIHBsYWNlaG9sZGVyPVwidGl0bGVcIiB2YWx1ZT0nJHt0aXRsZVZhbHVlfSc+PC9pbnB1dD5gO1xuICAgICAgICAgICAgaW5wdXREZXNjcmlwdGlvblN0ciA9IGA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cIm5vdGUtZGVzY3JpcHRpb24taW5wdXRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cImRlc2NyaXB0aW9uLi4uXCIgdmFsdWU9JyR7ZGVzY3JpcHRpb25WYWx1ZX0nPmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dFRpdGxlU3RyID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibm90ZS10aXRsZS1pbnB1dFwiIG5hbWU9XCJ0aXRsZVwiIHBsYWNlaG9sZGVyPVwidGl0bGVcIj48L2lucHV0PmA7XG4gICAgICAgICAgICBpbnB1dERlc2NyaXB0aW9uU3RyID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibm90ZS1kZXNjcmlwdGlvbi1pbnB1dFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb24uLi5cIj5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1tb2RhbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cIiR7Zm9ybUNsYXNzfVwiIGlkPSR7dGFza0lkfSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAke2lucHV0VGl0bGVTdHJ9XG4gICAgICAgICAgICAgICAgICAgICR7aW5wdXREZXNjcmlwdGlvblN0cn1cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym1pdC1ub3RlLWJ1dHRvblwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm0oKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1tb2RhbC1jb250YWluZXInKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lclRvRm9ybShmb3JtQ2xhc3MpIHtcbiAgICAgICAgaWYgKGZvcm1DbGFzcyA9PT0gJ2NyZWF0ZS1ub3RlLWZvcm0nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLW5vdGUtZm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3Rlcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS10aXRsZS1pbnB1dCcpLnZhbHVlLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS1kZXNjcmlwdGlvbi1pbnB1dCcpLnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZW1vdmVGb3JtKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGZvcm1DbGFzcyA9PT0gJ2VkaXQtbm90ZS1mb3JtJykge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtbm90ZS1mb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlZGl0Tm90ZUFuZFJlbmRlck5ld1NldE9mTm90ZXMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGUtdGl0bGUtaW5wdXQnKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGUtZGVzY3JpcHRpb24taW5wdXQnKS52YWx1ZSwgZS50YXJnZXQuaWQpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUZvcm0oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NyZWF0ZS1ub3RlLWNhcmQnKSB8fCAoZS50YXJnZXQucGFyZW50RWxlbWVudCAhPT0gbnVsbCAmJiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY3JlYXRlLW5vdGUtY2FyZCcpKSkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1ub3RlJykpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJGb3JtKCdjcmVhdGUtbm90ZS1mb3JtJywgZS50YXJnZXQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbmRlckZvcm0oJ2NyZWF0ZS1ub3RlLWZvcm0nLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1ub3RlJykgfHwgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IG51bGwgJiYgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbm90ZScpKSkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1ub3RlJykpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJGb3JtKCdlZGl0LW5vdGUtZm9ybScsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW5kZXJGb3JtKCdlZGl0LW5vdGUtZm9ybScsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtbm90ZScpIHx8IChlLnRhcmdldC5wYXJlbnRFbGVtZW50ICE9PSBudWxsICYmIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtbm90ZScpKSkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLW5vdGUnKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZU5vdGVBbmRSZW5kZXJOZXdTZXRPZk5vdGVzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGVOb3RlQW5kUmVuZGVyTmV3U2V0T2ZOb3RlcyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiB7cmVuZGVyTm90ZXN9O1xufSkoKTtcblxuZXhwb3J0IHtVSX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7VUl9IGZyb20gXCIuL1VJXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7VUkucmVuZGVyTm90ZXMoKX0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==