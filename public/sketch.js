class Queue {
  constructor() {
    this.content = [];
    this.buffer = '';
  }

  add (input) {
    this.buffer += input;
    // console.log(this.buffer);
    if (this.buffer.includes(';')) {
      this.content.push(this.buffer.trim());
      this.buffer = '';
    } else {
      // Do nothing, wait for more input
    }
  }

  getFirst() {
    return this.content.shift();
  }
}

let inputQueue = new Queue();
let latestInput = '';

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

// let re = /\d+;

let baseSize = 20;


// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:40510');

socket.onopen = function(event) {
  console.log('Websocket connected');
}

socket.onmessage = function(event) {
  // console.log(event.data);
  // inputQueue.add(event.data);
    interpret(event.data);
}

function preload() {
  song = loadSound('song.mp3');
  innerHeight = window.innerHeight;
  innerWidth = window.innerWidth;
}


function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  song.play();
  fft = new p5.FFT(0.9, 16);
}

function draw() {
  background('white');

  drawSound();
}

function drawSound(input) {
  var spectrum = fft.analyze();

  var bass = fft.getEnergy("bass");
  var lowMid = fft.getEnergy("lowMid");
  var mid = fft.getEnergy("mid");
  var highMid = fft.getEnergy("highMid");
  var treble = fft.getEnergy("treble");

  noStroke();
  translate(width / 2, height / 2);

  fill(0, 102, 153);
  ellipse(0, 0, baseSize + spectrum[0], baseSize + spectrum[2]);
}

function interpret(input) {
  // if (typeof input === 'string' || input instanceof String && input.length >= 1) {
    if (input.includes('p1')) {
      baseSize = getValuefrom(input) /10;
      console.log('P1: ' + input + ' base: ' + baseSize);
    } else if (input.includes('p2')) {

    } else if (input.includes('p3')) {

    } else if (input.includes('p4')) {

    }
  // }

}

function getValuefrom(input) {
  let value = input.split(':').pop();
  return value.split(';').shift();
}
