var objects = [];

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

// setup scene
$("document").ready(function() {
  var scene = document.querySelector('a-scene');
  // when scene is loaded
  scene.addEventListener('loaded', function (evt) {
    // if the camera position changes, recalculate distance between camera and objects
    var camera = document.querySelector('a-camera');
    camera.addEventListener('componentchanged', function (evt) {
      if (evt.detail.name === "position") {
        //loop through and check all objects
        if(objects.length > 0) {
          for(var i = 0; i < objects.length; i++){
            changeVisibility(objects[i], camera);
          }
        }
        var add = Math.floor(Math.random()*25+1);
        //console.log(add);
        if(add == 1){
          var poof = document.createElement("a-entity");
          poof.setAttribute("balloon", "color: pink");
          scene.appendChild(poof);
          objects.push(poof);
        }
      }
    });
  });
});
