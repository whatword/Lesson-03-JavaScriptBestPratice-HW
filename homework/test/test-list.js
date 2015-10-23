describe('Test NoteListManager', function() {
	var subject;

    beforeEach(function() {
    	subject = new NoteListManager();
    });

  it('It will test drawList functions', function() {
    // Write any pure function assertion here.
    subject._wrapper = document.createElement('div');
    subject.drawList([]);
    assert.isNull(subject._wrapper.querySelector('li'));
  });
});
