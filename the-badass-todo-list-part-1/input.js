'use strict';

(function(exports) {
var TodoInputManager = {
  _input: null, // Will be an element when starting up.
  drawInput(motd) {
    var input = TodoInputManager._input;
    // Quiz#3
    var tidyUp = function() {
      input.value = '';
      input.disabled = false;
    };
    input.placeholder = motd.message;
    input.addEventListener('keydown', function(event) {
      TodoInputManager.onUserCreateNewTodo(event, tidyUp);
    });
  },

  fetchData(afterFetch) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/demo-input-motd.json', true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(e) {
      // Watch out: we have a mysterious unknown 'this'.
      if (this.readyState == 4 && this.status == 200) {
        var motd = this.response;
        // The flow ends here.
        // Quiz#3
        afterFetch(motd);
      } else {
        // We omit the error in this novice's example.
      }
    };
    xhr.send();
  },

  // Quiz#3
  saveData(todoItem, afterSave) {
    console.log('saved');
    // Quiz#3
    afterSave();
  },

  // Quiz#3
  onUserCreateNewTodo(event, afterCreation) {
    var input = TodoInputManager._input;
    if (0x0D === event.keyCode) {
      var data = {
        checked: false,
        description: input.value
      };
      // To prevent user saving multiple times.
      input.disabled = true;
      TodoInputManager.saveData(data, afterCreation);
      // To save this in local, and notify the proxy to sync
      // it with the server.
      window.dispatchEvent(new CustomEvent('todo-item-created',
        { detail: data }));
    }
  },

  init() {
    TodoInputManager._input = document.querySelector('#todo-input');
    TodoInputManager.fetchData(function(response) {
      TodoInputManager.drawInput(response);
    });
  }
};

// Quiz#3
exports.TodoInputManager = TodoInputManager;
})(window);

