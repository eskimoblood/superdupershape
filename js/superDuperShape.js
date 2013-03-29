define(function() {
  return function(settings) {

    function lookUpTable(steps, min, max) {
      return function(calculateValue, param) {
        var values = [];
        var range = min + (max - min);
        var stepSize = range / (steps - 1);
        for (var i = 0; i < steps; i++) {
          var value = stepSize * i;
          values[i] = calculateValue ? calculateValue(value, param) : value;
        }
        return values;
      }
    }

    function powerMultiply(angle, param) {
      return Math.pow(angle * param.c, param.d);
    }

    function multiply(angle, factors) {
      return angle * factors;
    }

    function superFormular(angle, preset) {
      var s1 = Math.pow(Math.abs(Math.cos(preset.m * angle / 4)), preset.n2);
      var s2 = Math.pow(Math.abs(Math.sin(preset.m * angle / 4)), preset.n3);
      return Math.pow(s1 + s2, -1 / preset.n1);
    }

    var minPhi = -Math.PI / 2 * settings.c2;
    var maxPhi = Math.PI / 2 * settings.c2;
    var minTheta = -Math.PI * settings.c1;
    var maxTheta = Math.PI * settings.c1;

    var lookUpTheta = lookUpTable(settings.thetaSteps, minTheta, maxTheta);
    var lookUpPhi = lookUpTable(settings.phiSteps, minPhi, maxPhi);

    var sinThetaTable = lookUpTheta(function(a) {
      return Math.sin(a)
    });
    var cosThetaTable = lookUpTheta(function(a) {
      return Math.cos(a)
    });
    var thetaTable = lookUpTheta();
    var phiTable = lookUpPhi();

    var r1 = lookUpTheta(superFormular, settings.preset1);
    var r2 = lookUpPhi(superFormular, settings.preset2);

    var d1 = lookUpTheta(powerMultiply, {c: settings.c1, d: settings.d1});
    var d2 = lookUpTheta(powerMultiply, {c: settings.c2, d: settings.d2});

    var t2 = lookUpTheta(multiply, settings.t2 * settings.c2);
    var t2c = Math.pow(settings.c2, settings.d2) * settings.t2 * settings.c2 / 2;

    function calc(phi, theta) {
      var v2 = phiTable[phi] + settings.c3 * thetaTable[theta];
      var a = r1[theta] * (settings.t1 + d1[theta] * r2[phi] * Math.cos(v2));

      return new THREE.Vector3(
        50 * a * sinThetaTable[theta],
        50 * a * cosThetaTable[theta],
        50 * d2[theta] * (r2[phi] * Math.sin(v2) - t2[theta]) + t2c
      );
    }

    var vertices = [];
    for (var i = 0; i < settings.phiSteps; i++) {
      for (var j = 0; j < settings.thetaSteps; j++) {
        vertices.push(calc(i, j));
      }
    }

    return vertices;
  }
});