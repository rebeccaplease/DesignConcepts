
window.onload = function() {
  var x = 20;
  var y = 20;
  var dx = 3;
  var dy = 3;
  var d0 = 2;
  var angle = 0;
  var size = 100;


  var xdir = 1;
  var ydir = 1;

  var database = firebase.database();
  var userRef;
  var userID;

  var key_left, key_right;
  // setup canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");



  function keyDown(evt)  {
    switch (evt.keyCode) {
    case 37:  /* Left arrow was pressed */
      key_left = true;
      break;
    case 39:  /* Right arrow was pressed */
      key_right = true;
      break;
    }
  }

  function keyUp(evt) {
    switch (evt.keyCode) {
    case 37:  /* Left arrow was pressed */
      key_left = false;
      break;
    case 39:  /* Right arrow was pressed */
      key_right = false;
      break;
    }
  }

  window.addEventListener('keydown', keyDown, true);
  window.addEventListener('keyup', keyUp, true);

  function clear() {
    ctx.clearRect(0, 0, 1000, 1000);
  }

  function movePos() {

    if(key_left){
      // change key operation depending on direction
      //possible overflow?
      // if(Math.abs(angle%360) < 180){ // headed downwards
      //   angle -= d0;
      // }
      // else {
      //   angle += d0;
      // }

      angle -= d0;

    }
    else if(key_right) {
      // if(Math.abs(angle%360) < 180) { //headed upwards
      //   angle += d0;
      // }
      // else {
      //   angle -= d0;
      // }

      angle += d0;
    }
    // if hit wall, bounce back
    if( x <= 0 || x >= 1000-size ){
      xdir *= -1;
    }
    if( y <= 0 || y >= 500-size ){
      ydir *= -1;
    }

    x += xdir*dx*Math.cos((angle + d0)*Math.PI/180);
    y += ydir*dy*Math.sin((angle + d0)*Math.PI/180);
    userRef.update({
      xpos: x,
      ypos: y
    });

  }


  function drawChar(xpos, ypos){
    ctx.beginPath();
    ctx.rect(xpos, ypos, size, size);
    ctx.stroke();
  }

  function draw() {
    movePos();
    requestAnimationFrame(function() {
      draw();
    });
  }

  function setup() {

    // // check if cache ID is present, otherwise
    // if (typeof(Storage) !== "undefined") {
    //     // Code for localStorage/sessionStorage.
    //     if(localStorage.getItem("id") != null){
    //       console.log("id found!");
    //       userID = localStorage.id;
    //       userRef = database.ref(userID);
    //     }
    //     else{
    //       console.log("id not found!");
    //       userRef = database.ref().push();
    //       userID = userRef.key;
    //       localStorage.id = userID;
    //    }
    // }
    // else {
        // Sorry! No Web Storage support..
       userRef = database.ref().push();
       userID = userRef.key;
      //  localStorage.id = userID;
    // }
    console.log(userID);

    userRef.push({
      xpos: x,
      ypos: y
    });


    // userRef.on('value', function (snap) {
    //   clear();
    //   drawChar(snap.child("xpos").val(), snap.child("ypos").val());
    // });

    // Loop through users in order with the forEach() method. The callback
    // provided to forEach() will be called synchronously with a DataSnapshot
    // for each child:

    var query = firebase.database().ref().orderByKey();
    query.on("value", function(userSnapshot) {
      clear();
      userSnapshot.forEach(function(posSnapshot) {
        // console.log(posSnapshot.val());
        drawChar(posSnapshot.child("xpos").val(), posSnapshot.child("ypos").val());
      });
    });




  }

  setup();
  draw();



};
