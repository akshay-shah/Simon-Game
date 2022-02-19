var randomNumber;
var buttonColors = ["red", "blue", "yellow", "green"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  setLevel(level);
  randomNumber = Math.round(Math.random() * 3);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(id) {
  var button = $("." + id);
  button.fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

$(".btn").on("click", function () {
  var id = $(this).attr("id");
  userClickedPattern.push(id);
  playSound(id);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function (event) {
  if (event.key === "a" || event.key === "A") {
    nextSequence();
  }
});

function setLevel(level) {
  $("h1").text("Level " + level);
}

function restart() {
  $("h1").text("Game over Press A Key to ReStart");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentevel) {
  if (gamePattern[currentevel] === userClickedPattern[currentevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    restart();
  }
}
