define(function() {
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;

  return {
    width: WIDTH,
    height: HEIGHT,
    aspect: WIDTH / HEIGHT,
    viewAngle: 45,
    near: .1,
    far: 1000
  };
});