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
