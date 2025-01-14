AFRAME.registerComponent("model-opacity", {
  schema: { default: 1 },
  init: function () {
    this.el.addEventListener("model-loaded", () => {
      this.el.object3D.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = this.data;
        }
      });
    });
  },
});


