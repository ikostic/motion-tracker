var video = document.getElementById("video");
var canvas = document.getElementById("motion");
var score = document.getElementById("score");
var moveStatus = document.getElementById("moveStatus");
let motionStatus = 0;
let motionTimer = 10000;
let motionCount = 0;
let motionScoreList = [];

function initSuccess() {
  DiffCamEngine.start();
}

function initError() {
  alert("Something went wrong.");
}

function capture(payload) {
  score.textContent = payload.score;

  motionCount++;
  if (motionCount === 50) {
    motionScoreList.push(payload.score);
    if (motionScoreList.length > 6) {
      motionScoreList.shift();
    }
    const sum = motionScoreList.reduce((partial_sum, a) => partial_sum + a, 0);
    if (sum > 30) {
      moveStatus.textContent = "STREAMING";
    } else {
      moveStatus.textContent = "IDLE";
    }
    console.log(motionScoreList);
    motionCount = 0;
  }
}

DiffCamEngine.init({
  video: video,
  motionCanvas: canvas,
  initSuccessCallback: initSuccess,
  initErrorCallback: initError,
  captureCallback: capture,
});
