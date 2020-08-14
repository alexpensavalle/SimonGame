var userAnswers = [];
var SimonAnswers = [];
var rounds = 0;
var interval;

var addColor = function (arr) {
  var colorsArray = ["green", "red", "yellow", "blue"];
  return arr.push(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
};

var flashLights = function (arr) {
  
  var i = 0;

  interval = setInterval(function () {
    
    $("#" + arr[i])
      .fadeTo("fast", 0)
      .fadeTo("fast", 1);
    
    $("#sound-" + arr[i])[0].play();
    
    i++;
    
    if (i >= (arr.length)) {
      clearInterval(interval);
    }

  }, 1000);
  console.log(interval);
};

var increaseFontSize = function () {
 var el = document.querySelectorAll(".menuButton");
  for ( var i = 0; i < el.length; i ++ ) {
      el[i].style.fontSize = "120px";
  }
}

var decreaseFontSize = function () {
var el = document.querySelectorAll(".menuButton");
  for ( var i = 0; i < el.length; i ++ ) {
      el[i].style.fontSize = "40px";
  }
}

var updateRounds = function () {
  rounds++;
  $(".menuButton").html(rounds);
};

//Start Game:
$(".menuButton").click(function () {
  if(rounds===0){
    playerTurn();
    increaseFontSize();
  }
  else {
    resetGame();
  }      
});

var resetGame = function () {

  rounds = 0;
  clearInterval(interval);//
  userAnswers = [];
  SimonAnswers = [];
  playerTurn();
  
};

var playerTurn = function () {

  increaseFontSize();
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
          SimonAnswers = [];
          playerTurn();
          break;
        }//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

        //wrong answer
        if (SimonAnswers[i] !== userAnswers[i]) {
            
            var el = document.querySelectorAll(".menuButton");
            for ( var i = 0; i < el.length; i ++ ) 
                el[i].style.fontSize = "40px";
            
            
            $(".menuButton").html("Wrong!");
            
            setTimeout(
              wrong = function () {
                $(".menuButton").html("Start Over!");
                setTimeout(
                  resetGame, 1000);
              }, 
              1000);
        }
     }   
  });
};






