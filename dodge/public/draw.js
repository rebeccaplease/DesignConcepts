
window.onload = function() {
  var x = 20;
  var y = 20;
  var dx = 3;
  var dy = 3;
  var d0 = 2;
  var angle = 0;
  var size = 100;

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
      dx *= -1;
    }
    if( y <= 0 || y >= 500-size ){
      dy *= -1;
    }

    x += dx*Math.cos((angle + d0)*Math.PI/180);
    y += dy*Math.sin((angle + d0)*Math.PI/180);

  }

  function drawChar(){
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.stroke();
  }

  function draw() {
    firebase
    clear();
    movePos();
    drawChar();
    requestAnimationFrame(function() {
      draw();
    });
  }

  draw();

};
