var userAnswers = [];
var SimonAnswers = [];
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
      .fadeTo("fast", 0)
      .fadeTo("fast", 1);
    $("#sound-" + arr[i])[0].play();
    i++;
    if (i >= arr.length) {
      clearInterval(interval);
    }
  }, 1000);
};

var resetSimonAnswers = function () {
  SimonAnswers = [];
};

var updateRounds = function () {
  rounds++;
  //$("#show-rounds").html(rounds);
  $(".menuButton").html(rounds);
};

var resetGame = function () {
  rounds = 0;
  $("#show-rounds").html(rounds);
  userAnswers = [];
  
  $(".menuButton").on("click");
  resetSimonAnswers();
};

var playerTurn = function () {
  //during the game we don't want the player to switch between strict and relaxed
  $("#mode").off("click");
  //$(".menuButton").off("click");

  updateRounds();
  addColor(userAnswers);
  flashLights(userAnswers);

  $(".button")
    .off("click")
    .on("click", function () {
      $("#sound-" + $(this).attr("id"))[0].play();
      SimonAnswers.push($(this).attr("id"));

      for (var i = 0; i < SimonAnswers.length; i++) {
        //correct answer
        if (JSON.stringify(userAnswers) === JSON.stringify(SimonAnswers)) {
          resetSimonAnswers();
          playerTurn();
          break;
        }

        //wrong answer
        if (SimonAnswers[i] !== userAnswers[i]) {
      
            alert(
              "WRONG! Press the center button to start over!"
            );
            resetGame();
            break;
          }
        }
      
    });
};


//Start Game:
$(".menuButton").click(function () {
  if(rounds===0){
    playerTurn();
    increaseNumFontSize();
  }
  else {
    resetGame();
  }      
});


var increaseNumFontSize = function () {
 var el = document.querySelectorAll(".menuButton");
  for ( var i = 0; i < el.length; i ++ ) {
      el[i].style.fontSize = "120px";
  }
}