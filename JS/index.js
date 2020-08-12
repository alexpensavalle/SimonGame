var computerMovements = [];
var answers = [];
var rounds = 0;
//strict mode allows one  mistake per round. false if 'relaxed' mode
var strict = true;
//in strict mode, there is no last chance
var lastChance = false;

var addColor = function (arr) {
  var colorsArray = ["green", "red", "yellow", "blue"];
  return arr.push(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
};

var flashLights = function (arr) {
  var i = 0;

  var interval = setInterval(function () {
    $("#" + arr[i])
      .fadeTo("slow", 0)
      .fadeTo("slow", 1);
    $("#sound-" + arr[i])[0].play();
    i++;
    if (i >= arr.length) {
      clearInterval(interval);
    }
  }, 1500);
};

var resetAnswers = function () {
  answers = [];
};

var updateRounds = function () {
  rounds++;
  $("#show-rounds").html(rounds);
};

var resetGame = function () {
  rounds = 0;
  $("#show-rounds").html(rounds);
  computerMovements = [];
  if (strict === false) {
    lastChance = true;
  }
  $("#mode").on("click");
  $("#start").on("click");
  resetAnswers();
};

var playerTurn = function () {
  //during the game we don't want the player to switch between strict and relaxed
  $("#mode").off("click");
  $("#start").off("click");

  //winning condition
  if (rounds === 20) {
    resetGame();
  }

  updateRounds();
  addColor(computerMovements);
  flashLights(computerMovements);

  $(".button")
    .off("click")
    .on("click", function () {
      $("#sound-" + $(this).attr("id"))[0].play();
      answers.push($(this).attr("id"));

      for (var i = 0; i < answers.length; i++) {
        //correct answer
        if (JSON.stringify(computerMovements) === JSON.stringify(answers)) {
          resetAnswers();
          playerTurn();
          break;
        }

        //wrong answer
        if (answers[i] !== computerMovements[i]) {
          if (strict === false && lastChance === true) {
            lastChance = false;
            alert("You get one more chance...");
            resetAnswers();
            flashLights(computerMovements);
          } else if (
            answers[i] !== computerMovements[i] &&
            lastChance === false
          ) {
            alert(
              "That was it...start again, if you feel like a challenge...!"
            );
            resetGame();
            break;
          }
        }
      }
    });
};

$("#mode").click(function () {
  switch (strict) {
    case true:
      strict = false;
      lastChance = true;
      $("#mode").html("Mode: Relaxed");
      break;

    case false:
      strict = true;
      lastChance = false;
      $("#mode").html("Mode: Strict");
      break;
  }
});

$("#start").click(function () {
  console.log("Started");
  playerTurn();
});
