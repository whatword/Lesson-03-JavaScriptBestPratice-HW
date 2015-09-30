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

  fetchData() {
    return new Promise((function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/demo-input-motd.json', true);
      xhr.responseType = 'json';
      xhr.onreadystatechange = function(e) {
        // Watch out: we have a mysterious unknown 'this'.
        if (this.readyState === 4 && this.status === 200) {
          var motd = this.response;
          // The flow ends here.
          resolve(motd);
        } else if (this.status !== 200 ){
          reject('FETCHING FAILED: ' + this.status + ' ' + this.readyState);
        }
      };
      xhr.send();
    }).bind(this));
  },

  saveData(todoItem) {
    console.log('saved');
    // In theory we now should sync up with the server.
    // And resolve the Promise. However, a resolved Promise
    // is enough for our simple example.
    return Promise.resolve();
  },

  /**
   * After user enter the new item, remove the disabled status.
   */
  tidyUp() {
    this._input.value = '';
    this._input.disabled = false;
  },

  onUserCreateNewTodo(event) {
    var input = this._input;
    if (0x0D === event.keyCode) {
      var data = {
        checked: false,
        description: input.value
      };
      // To prevent user saving multiple times.
      input.disabled = true;
      var promise = this.saveData(data);
      // To save this in local, and notify the proxy to sync
      // it with the server.
      window.dispatchEvent(new CustomEvent('todo-item-created',
        { detail: data }));
      return promise;
    } else {
      // Handle nothing.
      return Promise.reject();
    }
  },

  handleEvent(event) {
    switch(event.type) {
      case 'keydown':
        if (event.target === this._input) {
          this.onUserCreateNewTodo(event)
              .then(this.tidyUp.bind(this))
              .catch(function() {});
        }
        break;
    }
  },

  start() {
    this._input = document.querySelector('#todo-input');
    window.addEventListener('keydown', this);
    this.fetchData().then(this.drawInput.bind(this));
  }
};

exports.TodoInputManager = TodoInputManager;
})(window);

