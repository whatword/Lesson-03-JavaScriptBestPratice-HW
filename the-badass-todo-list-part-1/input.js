'use strict';

(function(exports) {

var TodoInputManager = function() {
  this._input = null; // Will be an element when starting up.
}

TodoInputManager.prototype = {

  drawInput(motd) {
    var input = this._input;
    input.placeholder = motd.message;
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
        afterFetch(motd);
      } else {
        // We omit the error in this novice's example.
      }
    };
    xhr.send();
  },

  saveData(todoItem, afterSave) {
    console.log('saved');
    afterSave();
  },

  /**
   * After user enter the new item, remove the disabled status.
   */
  tidyUp() {
    this._input.value = '';
    this._input.disabled = false;
  },

  onUserCreateNewTodo(event, afterCreation) {
    var input = this._input;
    if (0x0D === event.keyCode) {
      var data = {
        checked: false,
        description: input.value
      };
      // To prevent user saving multiple times.
      input.disabled = true;
      this.saveData(data, afterCreation);
      // To save this in local, and notify the proxy to sync
      // it with the server.
      window.dispatchEvent(new CustomEvent('todo-item-created',
        { detail: data }));
    }
  },

  handleEvent(event) {
    switch(event.type) {
      case 'keydown':
        if (event.target === this._input) {
          this.onUserCreateNewTodo(event, this.tidyUp.bind(this));
        }
        break;
    }
  },

  start() {
    this._input = document.querySelector('#todo-input');
    window.addEventListener('keydown', this);
    this.fetchData((function(response) {
      this.drawInput(response);
    }).bind(this));
  }
};

exports.TodoInputManager = TodoInputManager;
})(window);

