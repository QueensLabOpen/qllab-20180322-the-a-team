var song;
var fft;
var button;
var innerWidth;
var innerHeight;
var reverb;
var reverbTime = 3;
var reverbDecay = 2;
var osc;
var pulse;
var ws;
var filter;

let baseSize = 20;

let filterFreq = 1000;
let filterResonance = 50;

// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:40510');

socket.onopen = function(event) {
  console.log('Websocket connected');
}

socket.onmessage = function(event) {
  interpret(event.data);
}

function preload() {
  // song = loadSound('song.mp3');
  song = loadSound('AB_BeatA110-01.wav');
  innerHeight = window.innerHeight;
  innerWidth = window.innerWidth;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  song.loop();
  filter = new p5.BandPass();
  fft = new p5.FFT(0.9, 16);
  song.disconnect();
  song.connect(filter);
}

function draw() {
  background('white');

  drawSound();
  drawSound2();
}

function drawSound() {
  var spectrum = fft.analyze();

  var bass = fft.getEnergy("bass");
  var lowMid = fft.getEnergy("lowMid");
  var mid = fft.getEnergy("mid");
  var highMid = fft.getEnergy("highMid");
  var treble = fft.getEnergy("treble");

  noStroke();
  push();
  translate(width / 2, height / 2);

  fill(0, 102, 153);
  ellipse(0, 0, baseSize + spectrum[0], baseSize + spectrum[2]);
  pop();
}

function drawSound2() {
  filter.freq(filterFreq);
  filter.res(filterResonance);

  var spectrum = fft.analyze();

  var bass = fft.getEnergy("bass");
  var lowMid = fft.getEnergy("lowMid");
  var mid = fft.getEnergy("mid");
  var highMid = fft.getEnergy("highMid");
  var treble = fft.getEnergy("treble");

  var features_base_x = 400;
  var features_base_width = 20;
  rect(features_base_x, height, features_base_width, -bass );
  features_base_x += features_base_width;
  rect(features_base_x, height, features_base_width, -lowMid );
  features_base_x += features_base_width;
  rect(features_base_x, height, features_base_width, -mid );
  features_base_x += features_base_width;
  rect(features_base_x, height, features_base_width, -highMid );
  features_base_x += features_base_width;
  rect(features_base_x, height, features_base_width, -treble );

  //noStroke();
  //translate(width / 2, height / 2);
  var bars_total_width = width / 6;
  var bars_total_height = height / 3;

  for (var i = 0; i< spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, bars_total_width);
    var h = -bars_total_height + map(spectrum[i], 0, 255, bars_total_height, 0);
    stroke(0,0,0);
    rect(x+5, height, bars_total_width / spectrum.length, h );
  }
}

function interpret(input) {
  let value = getValuefrom(input);

  if (input.includes('p1')) {
    baseSize =  value / 10;
    console.log('P1: ' + value + ' base: ' + baseSize);
  } else if (input.includes('p2')) {
    filterFreq = map(value, 0, 1024, 20, 20000);
    console.log('P2: ' + value + ' freq: ' + filterFreq);
  } else if (input.includes('p3')) {
    filterResonance = map(value, 0, 1024, 1, 100);
    console.log('P3: ' + value + ' resonance: ' + filterResonance);
  } else if (input.includes('p4')) {

  }
}

function getValuefrom(input) {
  let value = input.split(':').pop();
  return Number(value.split(';').shift().trim());
}
