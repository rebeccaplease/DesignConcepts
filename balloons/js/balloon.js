
// maximum radial distance
function randomPos(radius){
  var xP = Math.floor(Math.random()*radius-radius/2);
  var yP = Math.floor(Math.random()*radius+ 2);
  var zP = Math.floor(Math.random()*radius-radius/2);
  //console.log(xP + " " + yP + " " + zP);
  return { "x":xP, "y":yP, "z":zP };
}

AFRAME.registerComponent("balloon", {
  schema  : {
    color   : { default : "blue" },
    dist    : { type: "int", default: 70 },
    pos     : { type: "vec3", default: {x: 0, y: 0, z: 0}}
  },
  init    : function () {

    this.pos = randomPos(this.data.dist);
    this.el.setAttribute("position", this.pos);

    this.el.setAttribute("geometry", { "primitive":  "sphere"}); //randomize
    this.el.setAttribute("scale", {x:2, y:2, z:2});
    this.data.color = randomColor();
    //setup floating animation
    var float = document.createElement("a-animation");
    var animPos = this.pos.x + " " + (this.pos.y+0.2) + " " + this.pos.z;

  

    this.el.setAttribute("material", {transparent: true, opacity: 1.0, color: this.data.color});
    AFRAME.systems["free"].prototype.registerMe(this);


    // //setup popping animation
    // var capture = document.createElement("a-animation");
    // float.setAttribute("attribute", "");
    // float.setAttribute("to", animPos);
    // float.setAttribute("direction", "alternate");
    // float.setAttribute("dur", "2000");
    // float.setAttribute("repeat","indefinite");
    // float.setAttribute("delay", Math.random()*2+"");
    //
    // pop.addEventListener("animationend", function(evt){
    //   this.el.sceneEl.remove(this.el);
    // });


  },
  collide : function() {
    AFRAME.systems["free"].prototype.unregisterMe(this);
    AFRAME.systems["collected"].prototype.registerMe(this);
    console.log("collided!");
  },
  remove : function() {
    //this.el.emit("capture");
    this.el.sceneEl.remove(this.el);
  }
});
