
window.onload = function() {
  var x = 20;
  var y = 20;
  var dx = 2;
  var dy = 2;
  var d0 = 3;
  var angle = 0;
  var size = 100;

  var key_left, key_right;
  // setup canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function clear() {
    ctx.clearRect(0, 0, 1000, 1000);
  }

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


  function movePos() {
    console.log(angle);

    if(key_left){
      angle -= d0;
    }
    else if(key_right) {
      angle += d0;
    }

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
    // ctx.moveTo(x, y);
    // ctx.lineTo(x*Math.sin(30), y*Math.cos(30));
    // ctx.lineTo(x*Math.sin(-30), y*Math.cos(-30));
    // ctx.fill();
    //console.log(x + ' ' + y);
    // ctx.beginPath();
    // ctx.moveTo(x, y);
    //
    // ctx.arc(x, y, 5, 0, Math.PI * 10); // Outer circle
    // ctx.fill();
    ctx.rect(x, y, size, size);
    ctx.stroke();
  }

  function draw() {
    clear();
    movePos();
    drawChar();
    requestAnimationFrame(function() {
      draw();
    });
  }

  draw();

};
