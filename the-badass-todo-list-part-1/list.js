'use strict';

(function(exports) {

var TodoListManager = function() {
  // Local data storage; should sync up with the server.
  this._listTodoItem = [];
  // Will be an element as the list wrapper.
  this._wrapper = null;
};

TodoListManager.prototype = {

  drawList(listTodoItem) {
    var buffer = document.createDocumentFragment();
    for (var i = 0; i < listTodoItem.length; i++) {
      var data = listTodoItem[i];
      var item = document.createElement('li');
      var checkbox = document.createElement('span');
      checkbox.classList.add('todo-item-checkbox');
      checkbox.classList.toggle('checked', data.checked);
      checkbox.dataset.todoId = i;
      checkbox.textContent = checkbox.classList.contains('checked') ?
        '✓' : '\u2610';
      var description = document.createElement('span');
      description.classList.add('todo-item-description');
      description.textContent = data.description;
      item.appendChild(checkbox);
      item.appendChild(description);
      buffer.appendChild(item);
    }
    var list = document.createElement('ul');
    list.id = 'todo-list';
    list.appendChild(buffer);
    this._wrapper.appendChild(list);
  },

  clearList() {
    // Dirty trick :)
    this._wrapper.innerHTML = '';
  },

  saveData(listTodoItems, afterSave) {
    this._listTodoItem = listTodoItems;
    // In theory we now should sync up with the server.
    afterSave();
  },

  fetchData(afterFetch) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/demo-list.json', true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(e) {
      // Watch out: we have a mysterious unknown 'this'.
      if (this.readyState == 4 && this.status == 200) {
        var listData = this.response;
        // The flow ends here.
        afterFetch(listData);
      } else {
        // We omit the error in this novice's example.
      }
    };
    xhr.send();
  },

  onItemChecked(event) {
    event.target.classList.toggle('checked');
    var checked = event.target.classList.contains('checked');
    event.target.textContent = checked ? '✓' : '\u2610';
    var todoId = Number.parseInt(event.target.dataset.todoId, 10);
    // When checked, update the data as well.
    this._listTodoItem[todoId].checked = checked;
  },

  onNewTodoCreated(event) {
    var todo = event.detail;
    this._listTodoItem.push(todo);
    // This is why we need a local data store: we need to sync it
    // with server when user do some changes.
    this.saveData(this._listTodoItem,
      (function() {
        // We adopt a most simple but expensive way: render all things
        // everytime it changes.
        this.clearList();
        this.drawList(this._listTodoItem);
      }).bind(this));
  },

  handleEvent(event) {
    switch (event.type) {
      case 'todo-item-created':
        this.onNewTodoCreated(event);
        break;
      case 'click':
        if (event.target.classList.contains('todo-item-checkbox')) {
          this.onItemChecked(event);
        }
        break;
    }
  },

  start() {
    // Register the handler to sync up data.
    window.addEventListener('todo-item-created', this);
    window.addEventListener('click', this);
    this._wrapper = document.querySelector('#todo-list-wrapper');
    this.fetchData((function(response) {
      // First initialization.
      this._listTodoItem = response;
      this.drawList(response);
    }).bind(this));
  }
};

exports.TodoListManager = TodoListManager;
})(window);

