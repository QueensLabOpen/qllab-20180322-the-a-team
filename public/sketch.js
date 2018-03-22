
class Queue {
  constructor() {
    this.content = [];
    this.buffer = '';
  }

  add (input) {
    this.buffer += input;
    console.log(this.buffer);
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

// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:40510');

socket.onopen = function(event) {
  console.log('Websocket connected');
}

socket.onmessage = function(event) {
  // console.log(event.data);
  inputQueue.add(event.data);
}

// let buffer;
// clean() = function(input) {
//
// }

let latestInput = '';

function setup() {
  // put setup code here
  createCanvas(800, 600);
}

function draw() {
  // put drawing code here
  background('white');

  let temp = inputQueue.getFirst();
  if (temp) {
    latestInput = temp;
    console.log(latestInput);
  }
  textSize(32);
  text(latestInput, 10, 30);
  fill(0, 102, 153);
}
