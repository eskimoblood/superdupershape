requirejs(['camera', 'renderer','scene', 'mesh', 'gui', 'stats', 'eventHandler'], function(camera, renderer, scene, Mesh, gui, stats, eventHandler) {
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
    return;
  }
  var mesh = new Mesh(gui.controls);
  gui.onChange(mesh.update.bind(mesh));
  eventHandler.init(mesh);

  THREEx.WindowResize.bind(renderer, camera);

  scene.add(camera);
  animate();

  function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
  }

  function render() {
    renderer.clear();
    renderer.render(scene, camera);
  }

});