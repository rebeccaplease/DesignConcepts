var objects = [];

//returns distance between two objects
function calculateDistance(one, two){
  // one = one.getAttribute("position");
  // two = two.getAttribute("position");
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
        for(var i = 0; i < objects.length; i++){
          if( calculateDistance( objects[i].getAttribute("position"), camera.getAttribute("position") ) < 10 ) {
            //objects[i].collide();
          }
        }
        //randomly add objects to scene
        var add = Math.floor(Math.random()*25+1);
        if(add == 1) {
          var poof = document.createElement("a-entity");
          poof.setAttribute("balloon", "color: pink");
          scene.appendChild(poof);
          objects.push(poof);

        }


        // check for collision
        // move objects as child of camera, put above player

        // objects = objects.filter( obj => {
        //   if( calculateDistance( obj, camera ) < 3 ) {
        //     // obj.removeAttribute('balloon');
        //
        //     console.log("collected");
        //     return false;
        //   }
        //   return true;
        // });


      }
    });
  });
});
