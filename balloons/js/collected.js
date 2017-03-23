// System to keep track of all balloons that player has collecteds
AFRAME.registerSystem("collected", {
  init: function() {
    this.entities = [];
  },

  registerMe: function (balloon) {
    // remove floating animation
    balloon.el.removeChild(balloon.childNodes[0]);

    // move component to child of camera
    var scene = document.querySelector("a-scene");
    var camera = document.querySelector("a-camera");
    balloon.el.sceneEl.remove(balloon.el);
    camera.appendChild(balloon.el);

    // add transition animation to end pos?
    // change relative position to above camera
    // use entities length for radial positioning for x and y...
    balloon.pos = {x: 0, y: 0, z: 7};


    // add to entities array to keep track of collected
    this.entities.push(balloon.el);
  },
  unregisterMe: function (el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
  }
});
