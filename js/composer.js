define(['settings', 'renderer', 'camera', 'scene'], function(settings, renderer, camera, scene) {

  var renderTargetParameters = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBFormat,
    stencilBufer: true
  };

  var renderTarget = new THREE.WebGLRenderTarget(settings.width, settings.height, renderTargetParameters);

  var composer = new THREE.EffectComposer(renderer, renderTarget);

  var focus = new THREE.ShaderPass(THREE.ShaderExtras[ "focus" ]);
  composer.addPass(focus);

  var effectVignette = new THREE.ShaderPass(THREE.ShaderExtras[ "vignette" ]);
  effectVignette.renderToScreen = true;
  composer.addPass(effectVignette);

  var renderModel = new THREE.RenderPass(scene, camera);
  composer.addPass(renderModel);

  return composer;
});