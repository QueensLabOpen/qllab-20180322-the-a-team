let song;
let reverb;
let delay;

function preload() {
  song = loadSound('../assets/dub.mp3');
}
function setup() {
  // put setup code here
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  // song.disconnect();
  reverb.process(song, 6, 5);
  delay.process(song, 0.12, 0.7, 2300);
  song.setVolume(0.1);
  song.play();
}

// SVG variables

const fig = $('#fig');
const figHead = $('#fig-head');
const figFace = $('#fig-face');
const figFace2 = $('#fig-face-2');
const figLeftEye = $('#fig-left-eye');
const figRightEye = $('#fig-right-eye');
const figMouth = $('#fig-mouth');
const figLeftEar = $('#fig-left-ear');
const figRightEar = $('#fig-right-ear');
const figLeftArm = $('#fig-left-arm-hand');
const figRightArm = $('#fig-right-arm-hand');
const figLeftHand = $('#fig-left-hand');
const figRightHand = $('#fig-right-hand');
const figLeftLeg = $('#fig-left-leg');
const figRightLeg = $('#fig-right-leg');
const figContainer = $('#fig-container');
const figSkull = $('#fig-skull');

// Setup SVG

figFace2.css({ display: 'none' });

// Timeline animation

var tl1 = new TimelineMax();

function figLeftArmMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  tl1
    .set(figLeftArm, { rotation: 30, transformOrigin: 'right 45%' })
    .to(figLeftArm, 0.8, { rotation: -30, transformOrigin: 'right 45%', ease: Power0.easeNone });
  return tl1;
}

function figRightArmMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  tl1
    .set(figRightArm, { rotation: 30, transformOrigin: 'left 45%' })
    .to(figRightArm, 0.8, { rotation: -30, transformOrigin: 'left 45%', ease: Power0.easenone });
  return tl1;
}

function figLeftLegMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  tl1
    .set(figLeftLeg, { rotation: 30, transformOrigin: 'right 0%' })
    .to(figLeftLeg, 0.8, { rotation: 0, transformOrigin: 'right 0%', ease: Power0.easeNone });
  return tl1;
}

function figRightLegMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  tl1.to(figRightLeg, 0.8, { rotation: -30, transformOrigin: 'left 0%', ease: Power0.easeNone });
  return tl1;
}

function figMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  var bezier_path = [{ x: -10, y: -10 }, { x: 10, y: 10 }];
  tl1.set(fig, { x: -20 }).to(fig, 0.8, {
    bezier: { type: 'thru', values: bezier_path, curviness: 1 },
    ease: Power1.easeInOut
  });
  return tl1;
}

function figLeftEarMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  tl1
    .set(figLeftEar, { scaleX: 1.1, transformOrigin: 'right 50%' })
    .to(figLeftEar, 0.4, { scaleX: 0.9, transformOrigin: 'right 50%' });
  return tl1;
}

function figRightEarMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  tl1
    .set(figRightEar, { scaleX: 0.9, transformOrigin: 'left 50%' })
    .to(figRightEar, 0.4, { scaleX: 1.1, transformOrigin: 'left 50%' });
  return tl1;
}

function figHeadMove() {
  var tl1 = new TimelineMax({ repeat: -1, yoyo: true });
  tl1
    .set(figHead, { rotation: -10, transformOrigin: '50% 100%' })
    .to(figHead, 0.8, { rotation: 10, transformOrigin: '50% 100%' });
  return tl1;
}

tl1
  .add(figLeftArmMove(), 0)
  .add(figRightArmMove(), 0)
  .add(figLeftLegMove(), 0)
  .add(figRightLegMove(), 0)
  .add(figMove(), 0)
  .add(figLeftEarMove(), 0)
  .add(figRightEarMove(), 0)
  .add(figHeadMove(), 0);
