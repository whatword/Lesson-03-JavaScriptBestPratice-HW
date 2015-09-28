'use strict';

(function() {
  function drawInput(motd) {
    // Quiz #2
    var tidyUp = function() {
      var input = document.querySelector('#todo-input');
      input.value = '';
      input.disabled = false;
    };
    var input = document.querySelector('#todo-input');
    // Set motd here.
    input.placeholder = motd.message;
    // Quiz #2
    input.addEventListener('keydown', function(event) {
      if (0x0D === event.keyCode) {
        var data = {
          checked: false,
          description: input.value
        };
        // To prevent user saving multiple times.
        input.disabled = true;
        // Quiz #2
        saveData(data, tidyUp);
      }
    });
  }

  // Quiz #2
  function saveData(todoItem, afterSave) {
    console.log('saved');
    // Quiz #2
    afterSave();
  }

  // Quiz #2
  function fetchData(afterFetch) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/demo-input-motd.json', true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(e) {
      // Watch out: we have a mysterious unknown 'this'.
      if (this.readyState == 4 && this.status == 200) {
        var motd = this.response;
        // The flow ends here.
        // Quiz #2
        afterFetch(motd);
      } else {
        // We omit the error in this novice's example.
      }
    };
    xhr.send();
  }

  // Kick off
  // Quiz #2
  document.addEventListener('DOMContentLoaded', function(event) {
    fetchData(function(response) {
      // Quiz #2
      drawInput(response);
    });
  });
})();
