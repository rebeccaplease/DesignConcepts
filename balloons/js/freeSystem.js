//keep track of free balloons
AFRAME.registerSystem("free", {
  schema :  {
    entities: {type: "array", default: []}
  },
  init: function() {

    console.log("free system init!");
  },
  registerMe: function(bal) {
    console.log("registered to free");
    //console.log(this.schema.entities.default);
    this.schema.entities.default.push(bal); //keep track of in array
    //setup floating animation
    var float = document.createElement("a-animation");
    var animPos = bal.pos.x + " " + (bal.pos.y+0.2) + " " + bal.pos.z;


    //set up flaot animation
    float.setAttribute("attribute", "position");
    float.setAttribute("to", animPos);
    float.setAttribute("direction", "alternate");
    float.setAttribute("dur", "2000");
    float.setAttribute("repeat","indefinite");
    float.setAttribute("delay", Math.random()*2+"");
    bal.el.appendChild(float);

  },
  unregisterMe: function (bal) {
    //remove from array
    //var index = this.entities.indexOf(bal.el);
    //this.schema.entities.default.__proto__.splice(index, 1);

    //remove animation setup
    //bal.el.removeChild(bal.el.firstChild);
    console.log("unregistered from free");

  },
  tick : function(){

  }

});
