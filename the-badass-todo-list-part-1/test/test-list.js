describe('Test TodoListManager', function() {
  it('Show draw nothing when there are no data', function() {
    TodoListManager._wrapper = document.createElement('div');
    TodoListManager.drawList([]);
    assert.isNull(TodoListManager._wrapper.querySelector('li'));
  });

  // Quiz#3
  it('Can save some data', function() {
    var dummyList = [
      {checked: false, description: 'Dummy Todo #1'},
      {checked: true, description: 'Dummy Todo #2'}
    ];
    TodoListManager.saveData(dummyList, function() {
      assert.deepEqual(TodoListManager._listTodoItem, dummyList);
    });
  });

  // Quiz#3
  it('Will change one "checked" when the event is coming (BAD PATTERN)',
  function() {
    // Check if it is false before the test
    // Quiz#3
    assert.isFalse(TodoListManager._listTodoItem[0].checked);
    var dummyCheckElement = document.createElement('div');
    dummyCheckElement.dataset.todoId = '0';
    TodoListManager.onItemChecked({
      target: dummyCheckElement
    });
    // Check if it is changed after the test
    assert.isTrue(TodoListManager._listTodoItem[0].checked);
  });

  it('About unit test', function() {
    // 1. create an `it(...function(){})` structure like this
    // 2. grab anything you want to test, like `TodoListManager`
    var manager = TodoListManager;

    // 3. choose a function you want to test, like `drawList`, and then
    //    read the source code to know how to test it
    // 4. change any inner state it depends on, like `_wrapper` of the manager;
    //    since we need to run the function within a mocked environment
    manager._wrapper = document.createElement('div');

    // 5. call the function to do the thing
    manager.drawList([ { checked: true, description: 'Some dummy item'} ]);

    // 6. use `assert` (Chai) to check if the result is good or bad
    //    http://chaijs.com/api/assert/
    assert.isNotNull(TodoListManager._wrapper.querySelector('li'));
  });
});
