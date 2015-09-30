'use strict';

(function() {
  var _wrapper = document.querySelector('#note-content-wrapper');

  function start() {
    window.addEventListener('note-open', function(event) {
      var note = event.detail;
      resetWrapper();
      drawNote(note);
    });
  }

  function resetWrapper() {
    _wrapper.innerHTML = '';
  }

  function drawNote(note) {
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
    _wrapper.appendChild(h);
    _wrapper.appendChild(buff);
  }

  document.addEventListener('DOMContentLoaded', function(event) {
    start();
  });
})();
