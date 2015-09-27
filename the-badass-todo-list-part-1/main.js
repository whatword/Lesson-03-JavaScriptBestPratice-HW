'use strict';

function drawList(listTodoItem) {
  var buffer = document.createDocumentFragment();
  for (var i = 0; i < listTodoItem.length; i++) {
    var data = listTodoItem[i];
    var item = document.createElement('li');
    var checkbox = document.createElement('span');
    checkbox.classList.add('todo-item-checkbox');
    checkbox.classList.toggle('checked', data.checked);
    checkbox.textContent = checkbox.classList.contains('checked') ?
      '✓' : '\u2610';
    checkbox.addEventListener('click', function(event) {
      event.target.classList.toggle('checked');
      event.target.textContent = event.target.classList.contains('checked') ?
        '✓' : '\u2610';
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
  document.querySelector('#todo-list-wrapper').appendChild(list);
}

function drawInput() {
  var tidyUp = function() {
    var input = document.querySelector('#todo-input');
    input.value = '';
    input.disabled = false;
  };

  var input = document.querySelector('#todo-input');
  input.addEventListener('keydown', function(event) {
    if (0x0D === event.keyCode) {
      var data = {
        checked: false,
        description: input.value
      };
      // To prevent user saving multiple times.
      input.disabled = true;
      saveData(data, tidyUp);
    }
  });
}

function saveData(todoItem, afterSave) {
  console.log('saved');
  afterSave();
}

function fetchData(afterFetch) {
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
}

// Kick off
document.addEventListener('DOMContentLoaded', function(event) {
  fetchData(function(response) {
    drawList(response);
    drawInput();
  });
});
