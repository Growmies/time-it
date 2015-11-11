var util = require('util');

var TimeIt = {
  timers: {},

  time: function(label) {
    label = label || '__default';
    this.timers[label] = process.hrtime();
    return;
  },

  timeEnd: function(label, raw) {
    label = label || '__default';
    if (!this.timers[label]) return;

    var duration     = process.hrtime(this.timers[label]);
    var seconds      = duration[0];
    var milliseconds = duration[1]/1000000;

    delete this.timers[label];
    if (raw) {
      return seconds + milliseconds / 1000;
    }
    return util.format("%ds %dms", seconds, milliseconds);
  }
};

module.exports = TimeIt;
