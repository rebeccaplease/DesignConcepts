
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
  var bombs = {};

  var moved = false;
  var numBombs = 0;
  var isAlive = true;


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
  //return true if space is empty
  function checkCollision(xpos, ypos){
    //iterate through enemy players
    for (var key in enemies){
      if (enemies.hasOwnProperty(key)) {
        if(enemies[key].x == xpos && enemies[key].y == ypos){
          return false;
        }
      }
    }
    for (var key in bombs){
      if (enemies.hasOwnProperty(key)) {
        if(bombs[key].x == xpos &&  bombs[key].y == ypos){
          return false;
        }
      }
    }
    return true;
  }

  function keyPress(evt)  {
    if(!moved && isAlive) {
      switch (evt.keyCode) {
      case 37:  /* Left arrow was pressed */
        if(x > 0) {
          if(checkCollision(x-size, y)){
            x -= size;
            moved = true;
            updatePos();
            console.log(x, y);
          }
        }
        break;
      case 38:  /* Up arrow was pressed */
        if(y > 0) {
          if(checkCollision(x, y-size)){
            y -= size;
            moved = true;
            updatePos();
            console.log(x, y);
          }
        }
        break;
      case 39:  /* Right arrow was pressed */
        if(x < canvasX-size) {
          if(checkCollision(x+size, y)){
            x += size;
            moved = true;
            updatePos();
            console.log(x, y);
          }
        }
        break;
      case 40:  /* Down arrow was pressed */
        if(y < canvasY-size)  {
          if(checkCollision(x, y+size)){
            y += size;
            moved = true;
            updatePos();
            console.log(x, y);
          }
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

    ctx.strokeStyle="#000000";
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
    if(isAlive){
      ctx.fillStyle="#00FF00";
      ctx.beginPath();
      ctx.arc(x+size/2, y+size/2, size/2, 0, 2*Math.PI);
      ctx.fill();
    }
    else{

    }

    ctx.strokeStyle="#FF0000";
    //draw enemy players
    for (var key in enemies){
      if (enemies.hasOwnProperty(key)) {
        if(enemies[key].alive){
          ctx.beginPath();
          ctx.arc(enemies[key].x+size/2, enemies[key].y+size/2, size/2, 0, 2*Math.PI);
          ctx.stroke();
        }
        else{
          drawBlock(enemies[key].x, enemies[key].y);
        }
      }
    }
  }

  function drawBombs(){
    for (var key in bombs){
      if (bombs.hasOwnProperty(key)) {
        ctx.beginPath();
        drawBlock(bombs[key].x, bombs[key].y);
        ctx.stroke();
      }
    }
  }
  //
  // function drawPlayer(xpos, ypos){
  //   ctx.beginPath();
  //   ctx.arc(xpos+size/2, ypos+size/2, size, 0, 2*Math.PI);
  //   ctx.strokeStyle="#FF0000";
  //   ctx.stroke();
  //   //console.log(xpos, ypos);
  // }

  //draw X for defeated player or bombs
  function drawBlock(xpos, ypos){
    ctx.fillStyle="#FF0000";

    ctx.beginPath();
    ctx.fillRect(xpos,ypos, size, size);
    ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(xpos+size,ypos);
    // ctx.lineTo(xpos, ypos+size);
    // ctx.stroke();

  }


  function setup() {

    // check if cache ID is present, otherwise
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
        //Sorry! No Web Storage support..
       userRef = database.ref("/users").push();
       userID = userRef.key;
       localStorage.id = userID;
    // }

    drawBoard();

    //ensure you're not drawing on top of a user or a bomb
    x = Math.floor(Math.random()*Math.floor(canvasX/size))*size;
    y = Math.floor(Math.random()*Math.floor(canvasY/size))*size;
    console.log(userID);

    userRef.set({
      xpos: x,
      ypos: y,
      alive: true
    });
    userRef.onDisconnect().remove();


    // userRef.on('value', function (snap) {
    //   clear();
    //   drawChar(snap.child("xpos").val(), snap.child("ypos").val());
    // });

    // Loop through users in order with the forEach() method. The callback
    // provided to forEach() will be called synchronously with a DataSnapshot
    // for each child:

    var usersQuery = firebase.database().ref("/users").orderByKey();

    usersQuery.on("value", function(userSnapshot) {
      //clearBoard();
      enemies = {};
      userSnapshot.forEach(function(posSnapshot) {
        if(posSnapshot.key != userID){
          //console.log(posSnapshot.val());
          var xpos = posSnapshot.child("xpos").val();
          var ypos = posSnapshot.child("ypos").val();
          var alive = posSnapshot.child("alive").val();
          enemies[posSnapshot.key] =  { "x": xpos,
                                        "y": ypos,
                                        "alive": alive};

        }

      });


      var bombsQuery = database.ref("/bombs");
      bombsQuery.on("child_added", function(snap){
          // console.log("bomb value changed");
          //draw falling bomb for 2 seconds
          // if(snap.child("falling").val() == "true"){
          console.log("bomb dropping");
          //check own player for checkCollision after 2 seconds
          if(isAlive){
          setTimeout( function() {
            console.log("checking collision");
            var xpos = snap.child("xpos").val();
            var ypos = snap.child("ypos").val();

            if(Math.floor(x) == Math.floor(xpos) && Math.floor(y) == Math.floor(ypos) ) {
                 //drawDefeat()
                console.log("hit!");
                isAlive = false;
                window.alert("You've been hit!");
             }
            bombs[snap.key] = {"x":xpos,
                               "y":ypos }
                              //  "falling": "false"};
           }, 500);
         }
        });

      //console.log(enemies);

    });

  }

  function getCursorPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var xclick = event.clientX - rect.left;
    var yclick = event.clientY - rect.top;
    // console.log("x: " + xclick + " y: " + yclick);
    return [xclick, yclick];
  }
  function dropBomb(evt){
    var click = getCursorPosition(evt);
    //check for collision
    click[0] -= click[0] % size; //xcoord
    click[1] -= click[1] % size; //ycoord
    console.log("x: " + click[0] + " y: " + click[1]);

    //draw falling square

    //animate for 2 seconds

    //push bomb to firebase
    if(click[0] >= 0 && click[0]-size < canvasX){
      if(click[1] >= 0 && click[1]-size < canvasY){
        var bombsQuery = database.ref("/bombs");
        var bombRef = bombsQuery.push();
        bombRef.set({"xpos": click[0], "ypos": click[1] });
        // "falling": "true"});
        // setTimeout( function() {
        //
        // }, 2000);
      }
    }
  }

  document.onclick = dropBomb;


    function draw() {
      clearBoard();
      drawBoard();
      drawPlayers();
      drawBombs();
      requestAnimationFrame(function() {
        draw();
      });
    }

  setup();
  draw();

  document.getElementById("clear").onclick = function() {
     database.ref("/bombs").remove();
     bombs = {};
  }



};
