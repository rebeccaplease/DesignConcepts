
window.onload = function() {
  var x;
  var y;

  var size = 50;

  var canvasX = 1000;
  var canvasY = 1000;


  var database = firebase.database();
  var userRef;
  var userID;

  var key_left, key_right;
  // setup canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var keyFrame = 0;

  var enemies = {}; //object to hold all of the enemy players

  var moved = false;


  // function keyDown(evt)  {
  //   switch (evt.keyCode) {
  //   case 37:  /* Left arrow was pressed */
  //     key_left = true;
  //     break;
  //   case 39:  /* Right arrow was pressed */
  //     key_right = true;
  //     break;
  //   }
  // }
  //
  // function keyUp(evt) {
  //   switch (evt.keyCode) {
  //   case 37:  /* Left arrow was pressed */
  //     key_left = false;
  //     break;
  //   case 39:  /* Right arrow was pressed */
  //     key_right = false;
  //     break;
  //   }
  // }

  function updatePos() {
    userRef.update({
      xpos: x,
      ypos: y
    });

  }

  function keyPress(evt)  {
    if(!moved) {
      switch (evt.keyCode) {
      case 37:  /* Left arrow was pressed */
        if(x > 0) {
          x -= size;
          moved = true;
          updatePos();
          console.log(x, y);
        }
        break;
      case 38:  /* Up arrow was pressed */
        if(y > 0) {
          y -= size;
          moved = true;
          updatePos();
          console.log(x, y);
        }
        break;
      case 39:  /* Right arrow was pressed */
        if(x < canvasX-size) {
          x += size;
          moved = true;
          updatePos();
          console.log(x, y);
        }
        break;
      case 40:  /* Down arrow was pressed */
        if(y < canvasY-size)  {
          y += size;
          moved = true;
          updatePos();
          console.log(x, y);
        }
        break;
      }
    }
  }
  function keyReleased(evt){
    moved = false;
  }


  // window.addEventListener('keydown', keyDown, true);
  // window.addEventListener('keyup', keyUp, true);

  // window.addEventListener('keypress', keyPress, true);
  document.onkeydown = keyPress;
  document.onkeyup = keyReleased;


  function clearBoard() {
    ctx.clearRect(0, 0, canvasX, canvasY);
  }

  function drawBoard(){
    for(var row = 0; row <= canvasX; row+=size ){
      ctx.beginPath();
      ctx.moveTo(row,0);
      ctx.lineTo(row, canvasY);
      ctx.stroke();
    }

    for(var col = 0; col <= canvasY; col+=size ){
      ctx.beginPath();
      ctx.moveTo(0, col);
      ctx.lineTo(canvasY, col);
      ctx.stroke();
    }
  }

  function drawPlayers(){
    //draw your player
    ctx.beginPath();
    ctx.arc(x+size/2, y+size/2, size/2, 0, 2*Math.PI);
    ctx.stroke();
    for (var key in enemies){
      ctx.beginPath();
      ctx.arc(key.x+size/2, key.y+size/2, size/2, 0, 2*Math.PI);
      ctx.stroke();
    }
  }

  function drawPlayer(xpos, ypos){
    ctx.beginPath();
    ctx.arc(xpos+size/2, ypos+size/2, size, 0, 2*Math.PI);
    ctx.strokeStyle="#FF0000";
    ctx.stroke();
    //console.log(xpos, ypos);
  }


  function setup() {

    // check if cache ID is present, otherwise
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if(localStorage.getItem("id") != null){
          console.log("id found!");
          userID = localStorage.id;
          userRef = database.ref(userID);
        }
        else{
          console.log("id not found!");
          userRef = database.ref().push();
          userID = userRef.key;
          localStorage.id = userID;
       }
    }
    else {
        //Sorry! No Web Storage support..
       userRef = database.ref().push();
       userID = userRef.key;
       localStorage.id = userID;
    }

    drawBoard();

    x = Math.floor(Math.random()*Math.floor(canvasX/size))*size;
    y = Math.floor(Math.random()*Math.floor(canvasY/size))*size;
    console.log(userID);

    userRef.set({
      xpos: x,
      ypos: y,
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
      //clearBoard();
      userSnapshot.forEach(function(posSnapshot) {
        if(posSnapshot.key != userID){
          console.log(posSnapshot.val());
          var xpos = posSnapshot.child("xpos").val();
          var ypos = posSnapshot.child("ypos").val();
          //drawPlayer(xpos, ypos);
          //drawChar(posSnapshot.child("xpos").val(), posSnapshot.child("ypos").val());
          enemies[posSnapshot.key] =  { "x": xpos,
                                        "y": ypos };
        }
      });
    });

  }

    function draw() {
      clearBoard();
      drawBoard();
      drawPlayers();
      requestAnimationFrame(function() {
        draw();
      });
    }

  setup();
  draw();



};
