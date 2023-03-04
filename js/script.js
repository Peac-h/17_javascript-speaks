"use strict";

// selectors
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const cancelButton = document.getElementById("cancel-button");
const clearButton = document.getElementById("clear-button");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
const utterance = new SpeechSynthesisUtterance();
let currentChar;

// event listeners
playButton.addEventListener("click", function () {
  play(textInput.value);
});
pauseButton.addEventListener("click", pause);
cancelButton.addEventListener("click", cancel);
clearButton.addEventListener("click", clear);
speedInput.addEventListener("input", changeSpeed);
utterance.addEventListener("end", function () {
  textInput.disabled = false;
});
utterance.addEventListener("boundary", function (e) {
  currentChar = e.charIndex;
});

///////////////////////////
// functions

function play(text) {
  if (!text) return;

  utterance.text = text;
  utterance.rate = speedInput.value;
  textInput.disabled = true;

  if (speechSynthesis.paused) {
    return speechSynthesis.resume();
  }

  speechSynthesis.speak(utterance);
}

function pause() {
  speechSynthesis.pause();
}

function cancel() {
  speechSynthesis.cancel();
  textInput.disabled = false;
}

function clear() {
  textInput.value = "";
  cancel();
}

function changeSpeed() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    utterance.text = textInput.value;
    play(utterance.text.substring(currentChar));
  }
}
