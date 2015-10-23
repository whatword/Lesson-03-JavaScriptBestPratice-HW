'use strict';

  // Kick off
document.addEventListener('DOMContentLoaded', function(event) {
  var todoListManager = new NoteListManager();
  var todocontentManager = new NotecontentManager();
  todoListManager.start();
  todocontentManager.start();
});