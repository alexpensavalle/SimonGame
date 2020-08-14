//global vars
var SimonAnswers = [];
var UserAnswers = [];
var rounds = 0;
const fullGame = 3;
var interval;

//Pick a random color and add to an array
var addColor = function (arr) {
  var colorsArray = ["green", "red", "yellow", "blue"];
  return arr.push(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
};

//Controls timing of button flashing and sounding
var flashLights = function (arr) {
  var i = 0;
  interval = setInterval(function () {
    $("#" + arr[i])
      .fadeTo("fast", 0)//fade to black
      .fadeTo("fast", 1);//fade back to color

    $("#sound-" + arr[i])[0].play();//play a sound that matches the color - Simon

    i++;//iterate through array

    if (i >= arr.length) {
      clearInterval(interval);
    }
  }, 1000);//display for 1 sec, then display next color
};

//Used to increase font size when a number is displayed
var increaseFontSize = function () {
  var el = document.querySelectorAll(".menuButton");
  for (var i = 0; i < el.length; i++) {
    el[i].style.fontSize = "120px";
  }
};

//Used to decrease font size when a word is displayed
var decreaseFontSize = function () {
  var el = document.querySelectorAll(".menuButton");
  for (var i = 0; i < el.length; i++) {
    el[i].style.fontSize = "40px";
  }
};

//Not Win logic, but clears data and resets game
var youWin = function () {
  decreaseFontSize();
  $(".menuButton").html("You Win!");
  SimonAnswers = [];
  UserAnswers = [];
  clearInterval(interval);
  setTimeout(resetGame, 4000);
  return true;
};

//Update the round level...with win logic
var updateRounds = function () {
  if (rounds === fullGame) {
    youWin();
    console.log(youWin());
  } else {
    rounds++;
    $(".menuButton").html(rounds);
  }
};

//Start Game
$(".menuButton").click(function () {
  if (rounds === 0) {
    playerTurn();
    increaseFontSize();
  } else {
    resetGame();
  }
});

//Reset game -- clear data AND initiate player turn
var resetGame = function () {
  rounds = 0;
  clearInterval(interval);
  SimonAnswers = [];
  UserAnswers = [];
  increaseFontSize();
  playerTurn();
};

//Controls gameplay
var playerTurn = function () {
  if (rounds != fullGame) {//aka so long as you haven't won yet:
    
  updateRounds();
    addColor(SimonAnswers);
    flashLights(SimonAnswers);

    $(".button")
      .off("click")
      .on("click", function () {
        $("#sound-" + $(this).attr("id"))[0].play();//play a sound that matches the color - user
        UserAnswers.push($(this).attr("id"));//add to array

        for (var i = 0; i < UserAnswers.length; i++) {
          //correct answer
          if (JSON.stringify(SimonAnswers) === JSON.stringify(UserAnswers)) {
            UserAnswers = [];//reset user array, since next round user will have to enter ALL the elements again
            playerTurn();
            break;
<<<<<<< HEAD
          } //See README.md for more info on JSON.stringify

          //wrong answer
          if (SimonAnswers[i] !== userAnswers[i]) {
=======
          }//see README for more info on JSON.stringify
          
          //if wrong answer
          if (UserAnswers[i] !== SimonAnswers[i]) {//only need to check if the last array element doesn't match
>>>>>>> master
            
            decreaseFontSize();

            $(".menuButton").html("Wrong!");

            setTimeout(
              (wrong = function () {
                $(".menuButton").html("Start Over!");
                setTimeout(resetGame, 1000);
              }),
              1000
            );
          }
        }
      });
  } else {
    youWin();//congrats! go eat a cupcake!
  }
};

