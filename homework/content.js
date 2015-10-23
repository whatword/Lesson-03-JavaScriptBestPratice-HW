'use strict';

(function(exports) {

var NotecontentManager = function() {
  this._wrapper = null;
}

NotecontentManager.prototype = {

  resetWrapper() {
    this._wrapper.innerHTML = '';
  },

  drawNote(note) {
    var title = note.title;
    var h = document.createElement('h2');
    h.textContent = title;
    var passages = note.passages;
    var buff = document.createDocumentFragment();
    passages.forEach(function(passage) {
      var p = document.createElement('p');
      p.classList.add('note-passage');
      p.textContent = passage;
      buff.appendChild(p);
    });
    this._wrapper.appendChild(h);
    this._wrapper.appendChild(buff);
  },

  handleEvent(event) {
    switch(event.type) {
      case 'note-open':
        var note = event.detail;
        this.resetWrapper();
        this.drawNote(note);
        break;
    }
  },

  start() {
    this._wrapper = document.querySelector('#note-content-wrapper');
    window.addEventListener('note-open', this);
  }

};


exports.NotecontentManager = NotecontentManager;
})(window);
