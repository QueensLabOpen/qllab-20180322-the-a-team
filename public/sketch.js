// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:40510');

socket.onopen = function(event) {
  alert('Boom');
}

socket.onmessage = function(event) {
  console.log(event.data);
}

function setup() {
  // put setup code here
  createCanvas(800, 600);
}

function draw() {
  // put drawing code here

}
