var TimeIt = require('../');
var expect = require('chai').expect;

describe('Test TimeIt', function() {
  it('Should time things accurately', function(done) {
    TimeIt.time('test');
    setTimeout(function() {
      var duration = TimeIt.timeEnd('test', true);
      expect(duration).to.be.above(0.050).and.to.be.below(0.056);
      done();
    }, 50);
  });

  it('Should track several timers at the same time', function(done) {
    var iAmDone = after(100, done);

    for (var i = 0; i < 100; i++) {
      (function(i) {
        var label = 'test-' + i;
        TimeIt.time(label);
        setTimeout(function() {
          var duration = TimeIt.timeEnd(label, true);
          var min = (i / 1000) - 0.002;
          var max = (i / 1000) + 0.002;
          expect(duration).to.be.above(min).and.to.be.below(max);
          iAmDone();
        }, i);
      })(i);
    };
  });
});

function after(n, func) {
  return function() {
    if (--n < 1){
      return func.apply(this, arguments);
    }
  }
}
