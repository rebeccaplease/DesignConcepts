var freqLow = [697, 770, 852]
var freqHigh = [1477, 1209, 1336];
var sounds = [];
var nowPlaying = [];

function Tone(num){
  this.digit = num;

  if(num == 0) {
    this.freq1 = 941;
    this.freq2 = 1336;
  }
  else if(num == 1){
    this.freq1 = 697;
    this.freq2 = 1209;
  }
  else{
    if(num <= 3){
      this.freq1 = freqLow[0]; //choose the correct pair of frequencies
    }
    else if(num <= 6) {
      this.freq1 = freqLow[1];
    }
    else {
      this.freq1 = freqLow[2];
    }
    this.freq2 = freqHigh[num%3]
  }
}
// http://middleearmedia.com/web-audio-api-oscillators/
function playAudio(context, tone){
  oscillator1 = context.createOscillator(); // pure sine wave
  oscillator1.type = "sine";
  oscillator1.frequency.value = tone.freq1;
  oscillator1.connect(context.destination);

  oscillator2 = context.createOscillator(); // pure sine wave
  oscillator2.type = "sine";
  oscillator2.frequency.value = tone.freq2;
  oscillator2.connect(context.destination);

  oscillator1.start(0);
  oscillator2.start(0);
  nowPlaying.push(oscillator1, oscillator2);
}

function stopAudio(){
  if(nowPlaying.length > 0){
    for(var i = 0; i < nowPlaying.length; i++){
      nowPlaying[i].stop();
    }
    nowPlaying.length = 0; //empty array
  }
}


$("document").ready(function(){
  console.log("ready!");
  //webkit option
  var context = new (window.AudioContext || window.webkitAudioContext)();

  // initialize tone values
  for(var i = 0; i <= 9; i++){
    sounds.push(new Tone(i));
  }

  $(document).on('mouseover', '.num', function(e) {
    console.log($(e.target).attr('id'));
    playAudio(context, sounds[ $(e.target).attr('id')[1] ] );
  });
  $(document).on('mouseleave', '.num', function(e) {
    console.log($(e.target).attr('id'));
    stopAudio();
  });

});
