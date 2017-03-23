//keep track of free balloons
AFRAME.registerSystem("free", {
  schema :  {
    entities: {type: "array", default: []}
  },
  init: function() {

    console.log("free init!");
  },
  registerMe: function(bal) {
    console.log("registered to free");
    //this.entities.push(el

    // do animation setup
  },
  unregisterMe: function (bal) {
//var index = this.entities.indexOf(el);
  //  this.entities.splice(index, 1

  //remove animation setup
    console.log("unregistered from free");

  },
  tick : function(){

  }

});
