define(['container', 'scene'], function(container, scene) {
  return  {
    init: function(mesh) {
      var lastMouseX;
      var lastMouseY;
      var mouseDown;

      function onMouseDown(event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY
      }

      function onMouseUp() {
        mouseDown = false
      }

      function onMouseMove(event) {
        if (mouseDown) {
          var b = event.clientX;
          var a = event.clientY;
          scene.rotation.x = mesh.scene.rotation.x += (a - lastMouseY) * 0.01;
          scene.rotation.y = mesh.scene.rotation.y += (b - lastMouseX) * 0.01;
          lastMouseY = a;
          lastMouseX = b
        }
      }

      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mousemove', onMouseMove);
    }
  }
});
  