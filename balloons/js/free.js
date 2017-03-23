//keep track of free balloons
AFRAME.registerSystem("free", {
  schema :  {
    entities: {type: "array", default: []}
  },
  init: function() {

    console.log("free init!");
  },
  registerMe: function(el) {
    //console.log("registered to free");
    //this.entities.push(el);
  },
  unregisterMe: function (el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
  },
  tick : function(){

  }

});
