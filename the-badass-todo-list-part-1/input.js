'use strict';

(function() {
  function drawInput(motd) {
    var tidyUp = function() {
      var input = document.querySelector('#todo-input');
      input.value = '';
      input.disabled = false;
    };
    var input = document.querySelector('#todo-input');
    // Set motd here.
    input.placeholder = motd.message;
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
  }

  // Kick off
  document.addEventListener('DOMContentLoaded', function(event) {
    fetchData(function(response) {
      drawInput(response);
    });
  });
})();
