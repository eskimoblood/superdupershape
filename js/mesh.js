define(['superDuperShape', 'scene', 'settings'], function(superDuperShape, scene, globalSettings) {
  function meshObject(settings) {
    this.scene = new THREE.Object3D();
    this.createMeshObject(settings);
    this.createMeshMaterial();
  }

  meshObject.prototype = {

    update: function(settings) {
      this.createMeshObject(settings);
      this.scene.geometry.vertices = this.geometry.vertices;
      this.scene.geometry.verticesNeedUpdate = true
    },

    createMeshObject: function(settings) {

      this.geometry = new THREE.Geometry();
      this.geometry.dynamic = true;
      var thetaSteps = globalSettings.thetaSteps;
      var phiSteps = globalSettings.phiSteps;

      this.geometry.vertices = superDuperShape({
        phiSteps: phiSteps,
        thetaSteps: thetaSteps,
        preset1: {
          n1: settings.n11,
          n2: settings.n12,
          n3: settings.n13,
          m: settings.m1
        },
        preset2: {
          n1: settings.n21,
          n2: settings.n22,
          n3: settings.n23,
          m: settings.m2
        },
        c1: settings.c1,
        c2: settings.c2,
        c3: settings.c3,
        d1: settings.d1,
        d2: settings.d2,
        t1: settings.t1,
        t2: settings.t2
      });

      for (var phi = 0; phi < (phiSteps - 1); phi++) {
        for (var theta = 0; theta < (thetaSteps - 1); theta++) {
          var d = phi * thetaSteps + theta;
          var c = d + 1;
          var a = (phi + 1) * thetaSteps + theta;
          var b = a + 1;

          var face = new THREE.Face4(a, b, c, d);
          this.geometry.faces.push(face);
        }
      }
      this.geometry.computeFaceNormals();
      this.geometry.computeVertexNormals();
    },

    createMeshMaterial: function() {
      this.scene = new THREE.Mesh(this.geometry, this.shader());
      this.scene.doubleSided = true;
      scene.add(this.scene);
      this.scene.rotation.x = 0;
      this.scene.rotation.y = 0;
    },

    shader: function() {

      var attributes = {
        a_color: {
          type: 'c', // a float
          value: [] // an empty array
        }
      };


      var colors = new Rainbow();
      colors.setSpectrum('ffffff', '594f4f', '547980', '45ada8', '9de0ad', 'e5fcc2');
      var colorCount = 500;
      colors.setNumberRange(0, colorCount);
      var vShader = document.getElementById('vertexshader');
      var fShader = document.getElementById('fragmentshader');

      var shader = new THREE.ShaderMaterial({
        attributes: attributes,
        vertexShader: vShader.text,
        fragmentShader: fShader.text
      });

      shader.side = THREE.DoubleSide;
      var values = attributes.a_color.value;

      var length = this.geometry.vertices.length;

      for (var i = 0; i < length; i++) {
//
        var c = i / 15000;
        if (i % 10 < 3) {
          var cl = Math.sin(c + Math.cos(c)) * colorCount * Math.sin(c);
        } else {
          var cl = Math.sin(c % Math.sin(c)) * colorCount;
        }
        cl = Math.abs(Math.floor(cl)) % colorCount;
        values.push(new THREE.Color(parseInt(colors.colorAt(cl || 0), 16)));
      }


      return  shader;
    }
  };
  return meshObject;
});

