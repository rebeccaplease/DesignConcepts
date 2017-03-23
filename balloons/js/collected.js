// System to keep track of all balloons that player has collected
AFRAME.registerSystem("collected", {
  schema : {
    entities : {type: "array", default: []}
  },
  init: function() {
    //this.schema.entities = [];
    console.log("register system init!");
  },
  tick : function(){

  },

  registerMe: function (balloon) {
    console.log("registered to collected");
    //console.log(this.schema.entities);

    // // move component to child of camera
    // var scene = document.querySelector("a-scene");
    // var camera = document.querySelector("a-camera");
    //balloon.el.sceneEl.remove(balloon.el); //remove from scene
    //camera.appendChild(balloon.el); //add as child of camera

    //reposition balloon

    //balloon.el.setAttribute("position", { "x":0, "y":3, "z":0 });

    this.schema.entities.default.push(balloon);

    // remove floating animation
    // balloon.el.removeChild(balloon.childNodes[0]);
    //

    //
    // // add transition animation to end pos?
    // // change relative position to above camera
    // // use entities length for radial positioning for x and y...
    // balloon.pos = {x: 0, y: 0, z: 7};
    //
    //
    // // add to entities array to keep track of collected
    // this.entities.push(balloon.el);

  },
  unregisterMe: function (el) {
    //var index = this.entities.indexOf(el);
    //this.entities.splice(index, 1);
  }
});
