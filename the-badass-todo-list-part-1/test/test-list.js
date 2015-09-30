describe('Test TodoListManager', function() {
  var subject;
  
  beforeEach(function() {
    subject = new TodoListManager();
  });

  it('Show draw nothing when there are no data', function() {
    subject._wrapper = document.createElement('div');
    subject.drawList([]);
    assert.isNull(subject._wrapper.querySelector('li'));
  });

  it('Can save some data', function(done) {
    var dummyList = [
      {checked: false, description: 'Dummy Todo #1'},
      {checked: true, description: 'Dummy Todo #2'}
    ];
    subject.saveData(dummyList).then(function() {
      assert.deepEqual(subject._listTodoItem, dummyList);
      done();
    }).catch(done);
  });

  it('Will change one "checked" when the event is coming (BAD PATTERN)',
  function(done) {
    var dummyList = [
      {checked: false, description: 'Dummy Todo #1'},
      {checked: true, description: 'Dummy Todo #2'}
    ];
    subject.saveData(dummyList).then(function() {
      var dummyCheckElement = document.createElement('div');
      dummyCheckElement.dataset.todoId = '0';
      subject.onItemChecked({
        target: dummyCheckElement
      });
      // Check if it is changed after the test
      assert.isTrue(subject._listTodoItem[0].checked);
      done();
    }).catch(done);
  });

  it('About unit test', function() {
    // 1. create an `it(...function(){})` structure like this
    // 2. grab anything you want to test, like `subject`
    var manager = subject;

    // 3. choose a function you want to test, like `drawList`, and then
    //    read the source code to know how to test it
    // 4. change any inner state it depends on, like `_wrapper` of the manager;
    //    since we need to run the function within a mocked environment
    manager._wrapper = document.createElement('div');

    // 5. call the function to do the thing
    manager.drawList([ { checked: true, description: 'Some dummy item'} ]);

    // 6. use `assert` (Chai) to check if the result is good or bad
    //    http://chaijs.com/api/assert/
    assert.isNotNull(subject._wrapper.querySelector('li'));
  });
});
