define(['settings', 'container'], function(settings, container) {


  var renderer = new THREE.WebGLRenderer({antialias: true});

  renderer.setSize(settings.width, settings.height);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMapAutoUpdate = true;
  renderer.setFaceCulling('front_and_back', 'cw');
  renderer.autoClear = true;
  container.appendChild(renderer.domElement);

  return renderer;
});
