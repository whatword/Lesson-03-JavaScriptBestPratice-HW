'use strict';

(function(exports) {

var TodoListManager = {
  _listTodoItem: [],  // Local data storage; should sync up with the server.
  _wrapper: null,     // Will be an element as the list wrapper.
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
      checkbox.addEventListener('click', function(event) {
        TodoListManager.onItemChecked(event);
      });
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
    TodoListManager._wrapper.appendChild(list);
  },

  clearList() {
    // Dirty trick :)
    TodoListManager._wrapper.innerHTML = '';
  },

  saveData(listTodoItems, afterSave) {
    TodoListManager._listTodoItem = listTodoItems;
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
    TodoListManager._listTodoItem[todoId].checked = checked;
  },

  onNewTodoCreated(event) {
    var todo = event.detail;
    TodoListManager._listTodoItem.push(todo);
    // This is why we need a local data store: we need to sync it
    // with server when user do some changes.
    TodoListManager.saveData(TodoListManager._listTodoItem,
      function() {
        // We adopt a most simple but expensive way: render all things
        // everytime it changes.
        TodoListManager.clearList();
        TodoListManager.drawList(TodoListManager._listTodoItem);
      });
  },

  init() {
    // Register the handler to sync up data.
    window.addEventListener('todo-item-created',
        TodoListManager.onNewTodoCreated);
    TodoListManager._wrapper = document.querySelector('#todo-list-wrapper');
    TodoListManager.fetchData(function(response) {
      // First initialization.
      TodoListManager._listTodoItem = response;
      TodoListManager.drawList(response);
    });
  }
};

exports.TodoListManager = TodoListManager;
})(window);

