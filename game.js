const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var gameLevel = 0;

$(document).keypress((e) => {
  if (e.key === "a" && gameStart === false) {
    gameStart = true;

    setTimeout(() => {
      nextSequence();
    }, 1000);
    //console.log(e.key);
  } else if (gameStart === "gameover") {
    gameStart = true;
    //$("#level-title").text("Level " + gameLevel);
    setTimeout(() => {
      nextSequence();
    }, 1000);
  } else {
    console.log("the game has already been started");
  }
});

$(".btn").click(function () {
  //console.log("clicked!");
  handler(this);
});

function nextSequence() {
  gameLevel += 1;
  $("#level-title").text("Level " + gameLevel);

  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  /*console.log(
    "gameLength:" + gamePattern.length + " gamePattern:" + gamePattern
  );*/
  $("#" + randomChosenColour).animate(
    {
      opacity: 0.25,
    },
    100,
    function () {
      $("#" + randomChosenColour).animate({
        opacity: 100,
      });
    }
  );

  playSound(randomChosenColour);
  userClickedPattern = [];
}

function handler(selectedColor) {
  var userChosenColor = $(selectedColor).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  answerChecker(userChosenColor);
}

function playSound(selectedColor) {
  var audio = new Audio(getSound(selectedColor));
  audio.play();
}

function getSound(color) {
  switch (color) {
    case "green":
      return "sounds/green.mp3";
      break;
    case "red":
      return "sounds/red.mp3";
      break;
    case "yellow":
      return "sounds/yellow.mp3";
      break;
    case "blue":
      return "sounds/blue.mp3";
      break;
    default:
      return "sounds/wrong.mp3";
      break;
  }
}

function animatePress(currentColour) {
  //console.log(currentColour);
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function answerChecker(selectedColor) {
  var gamePatternLenght = gamePattern.length;
  var userPatternLenght = userClickedPattern.length;
  //console.log("userLength:" + userPatternLenght);

  if (gamePatternLenght === userPatternLenght) {
    if (gamePattern[gamePatternLenght - 1] === selectedColor) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    } else {
      gameOver();
    }
  } else if (gamePatternLenght > userPatternLenght) {
    for (var i = 0; i <= userPatternLenght - 1; i++) {
      //console.log("i:" + i + " userPatternlength:" + (userPatternLenght - 1));
      if (gamePattern[i] === userClickedPattern[i]) {
        //console.log("userPattern:" + userClickedPattern);
      } else {
        gameOver();
      }
    }
  } else {
    //console.log("game over!");
    gameOver();
  }
}

function gameOver() {
  playSound("gameover");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  gamePattern = [];
  userClickedPattern = [];
  gameLevel = 0;
  gameStart = "gameover";
  $("#level-title").text("Game Over, Press Any Key to Restart.");
}
