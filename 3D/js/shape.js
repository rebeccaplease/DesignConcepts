var objects = [];
var geometries = ["sphere","tetrahedron", "dodecahedron", "octahedron", "torus", "torusKnot"];

//creates animation element to be appended to Shape
function createAnimation(event){
  var anim = document.createElement("a-animation");
  anim.setAttribute("begin", event);
  return anim;
}
// maximum radius distance
function randomPos(radius){
  var xP = Math.floor(Math.random()*radius-radius/2);
  var yP = Math.floor(Math.random()*radius-radius/2);
  var zP = Math.floor(Math.random()*radius-radius/2);
  //console.log(xP + " " + yP + " " + zP);
  return { "x":xP, "y":yP, "z":zP };
}
//calcualte distance away and make visible or invisible
function changeVisibility(obj, camera){
  var objPos = obj.getAttribute("position");
  var camPos = camera.getAttribute("position");

  if( calculateDistance(objPos, camPos) > 15) {
    //fade away box when farther than 10
    //obj.setAttribute('material','opacity', '0.0');
    if( obj.is("visible") || obj.is("appearing") ){
      obj.emit("fadeOut");
    }
  }
  else {
    //obj.setAttribute('material','opacity', '1.0');
    if( obj.is("invisible") || obj.is("disappearing") ){
      obj.emit("fadeIn");
    }
  }
}
//returns distance between two objects
function calculateDistance(one, two){
  return Math.sqrt(
    + Math.pow(one.x-two.x, 2)
    + Math.pow(one.y-two.y, 2)
    + Math.pow(one.z-two.z, 2) );
}


AFRAME.registerComponent("shape", {
  schema  : {
    color   : { default : "" },
    dist    : { type: 'int', default: 70 }
  },

  init    : function () {

    var pos = randomPos(this.data.dist);
    this.el.setAttribute("position", pos);

    var pickGeo = Math.floor(Math.random()*geometries.length);
    this.el.setAttribute("geometry", { "primitive":  geometries[pickGeo]}); //randomize
    this.el.setAttribute("scale", {x:2, y:2, z:2});
    this.data.color = randomColor();

    //setup floating animation
    var float = document.createElement("a-animation");
    var animPos = pos.x + " " + (pos.y+0.2)+ " "+ pos.z;

    float.setAttribute("attribute", "position");
    float.setAttribute("to", animPos);
    float.setAttribute("direction", "alternate");
    float.setAttribute("dur", "2000");
    float.setAttribute("repeat","indefinite");
    float.setAttribute("delay", Math.random()*2+"");
    this.el.appendChild(float);

    //setup appear and disappear animations
    var a_appear = createAnimation("fadeIn");
    var a_disappear = createAnimation("fadeOut");
    a_appear.setAttribute("attribute", "material.opacity");
    a_appear.setAttribute("begin", "fadeIn");
    a_appear.setAttribute("dur","500")
    a_appear.setAttribute("to","1.0");

    a_disappear.setAttribute("attribute", "material.opacity");
    a_disappear.setAttribute("begin", "fadeOut");
    a_disappear.setAttribute("dur","500");
    a_disappear.setAttribute("from","1.0");
    a_disappear.setAttribute("to","0.0");
    a_disappear.setAttribute("fill","backwards");

    this.el.appendChild(a_appear);
    this.el.appendChild(a_disappear);

    // add event listeners for start and end of fade animations
    a_appear.addEventListener("animationstart", function(){
      this.el.removeState("disappearing");
      this.el.removeState("invisible");
      this.el.addState("appearing");
      //  console.log("appear");
    });
    a_appear.addEventListener("animationend", function(){
      this.el.removeState("disappearing");
      this.el.removeState("invisible");
      this.el.addState("visible");
      // console.log("visible");
    });

    a_disappear.addEventListener("animationstart", function(){
      this.el.removeState("appearing");
      this.el.removeState("visible");
      this.el.addState("disappearing");
      //  console.log("disappear");
    });
    a_disappear.addEventListener("animationend", function(){
      this.el.removeState("appearing");
      this.el.removeState("visible");
      this.el.addState("invisible");
      // console.log("invisible");
    });
    this.el.addState("visible");
    this.el.setAttribute("material", {transparent: true, opacity: 1.0, color: this.data.color});
    //add to objects array
    //objects.push(this.el);
  },
  remove : function() {
    //remove from object array
    //objects.remove(this.el);
    this.el.sceneEl.remove(this.el);
  }
});
