AFRAME.registerComponent('environment-map', {
    schema: {
      map: { type: 'asset', default: '' }
    },
    init: function (){
  
      var self = this;
  
      self.envMap = new THREE.Texture();
      self.envMap.image = self.data.map;
      self.envMap.mapping = THREE.EquirectangularReflectionMapping;
  
      self.el.addEventListener('model-loaded', () => {
        var obj = self.el.object3D;
        obj.traverse(node => {
          if (node.type == "Mesh") {
            node.material.envMap = self.envMap;
            node.material.envMap.needsUpdate = true;
          }
        });
      });
    }
  });