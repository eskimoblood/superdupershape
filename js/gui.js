define(function() {


  var settings = {
    t1: {min: -1, max: 1},
    d1: {min: -1, max: 1},
    m1: {min: 0, max: 20},
    n11: {min: 0, max: 100},
    n12: {min: 0, max: 100},
    n13: {min: 0, max: 100},
    t2: {min: -1, max: 1},
    d2: {min: -1, max: 1},
    n21: {min: 0, max: 100},
    n22: {min: 0, max: 100},
    n23: {min: 0, max: 100},
    m2: {min: 0, max: 100},
    c1: {min: 0, max: 8},
    c2: {min: 0, max: 8},
    c3: {min: 0, max: 8}
  };

  var controls = new function() {

    this.t1 = 0;
    this.d1 = 0;
    this.m1 = 6;
    this.n11 = 8;
    this.n12 = 15;
    this.n13 = 30;

    this.t2 = 0;
    this.d2 = 0;
    this.m2 = 4;
    this.n21 = 12;
    this.n22 = 10;
    this.n23 = 10;

    this.c1 = 2;
    this.c2 = 4;
    this.c3 = 1;

  };

  var gui = new dat.GUI();

  var f1 = gui.addFolder('First Form');

  for (var i in settings) {
    var s = settings[i];
    f1.add(controls, i, s.min, s.max).listen().onChange(update);
  }

  var listeners = [];

  function update () {
    listeners.forEach(function  (listener) {
      listener(controls);
    })
  }

  return {
    onChange: function  (func) {
      listeners.push(func);
    },
    controls: controls
  }

});
