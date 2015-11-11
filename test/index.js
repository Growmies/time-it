var TimeIt = require('../');
var expect = require('chai').expect;

describe('Test TimeIt', function() {
  it('Should time things accurately', function(done) {
    var timeIt = new TimeIt();
    timeIt.time('test');
    setTimeout(function() {
      var duration = timeIt.timeEnd('test', true);
      expect(duration).to.be.above(50).and.to.be.below(56);
      done();
    }, 50);
  });

  it('Should track several timers at the same time', function(done) {
    timeIt = new TimeIt();

    var iAmDone = after(100, done);

    for (var i = 0; i < 100; i++) {
      (function(i) {
        var label = 'test-' + i;
        timeIt.time(label);
        setTimeout(function() {
          var duration = timeIt.timeEnd(label, true);
          var min = i - 5;
          var max = i + 5;
          expect(duration).to.be.above(min).and.to.be.below(max);
          iAmDone();
        }, i);
      })(i);
    };
  });

  it('Should support different instances without label clashing', function(done) {
    timeIt1 = new TimeIt();
    timeIt2 = new TimeIt();

    timeIt1.time('timer');
    timeIt2.time('timer');

    setTimeout(function() {
      var duration = timeIt1.timeEnd('timer', true);
      var min = 10 - 5;
      var max = 10 + 5;
      expect(duration).to.be.above(min).and.to.be.below(max);
    }, 10);

    setTimeout(function() {
      var duration = timeIt2.timeEnd('timer', true);
      var min = 50 - 5;
      var max = 50 + 5;
      expect(duration).to.be.above(min).and.to.be.below(max);
      done();
    }, 50);

  });

  it('Should output raw values in milliseconds', function(done) {

    var timeIt = new TimeIt();
    timeIt.time('test');
    setTimeout(function() {
      var duration = timeIt.timeEnd('test', true);
      expect(duration).to.be.above(1500).and.to.be.below(1550);
      done();
    }, 1500);
  });
});

function after(n, func) {
  return function() {
    if (--n < 1){
      return func.apply(this, arguments);
    }
  }
}
