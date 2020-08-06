# SimonGame
GA SimonGame Project

![Basic Wireframe](https://github.com/alexpensavalle/SimonGame/blob/master/IMG-7963.jpg)

PseudoCode: General Gameplay

1.  User presses center circle "START"
2.  center circle changes to display "1" (aka, level 1, or only one color to remember)
3.  a random number generator randomly picks a color, and pushes it to a global array (aka "simonArray")
4.  model(?) iterates through simonArray
    - for each element (color) in simonArray, run a function which takes in color as a parameter and displays (lights up) appropriate color button on screen for a set period of time (short), and plays a sound while lit, in the VIEW
5. users turn! 
  - set up event button listeners corresponding to each color
  - start timer
6. while timer < 3000ms: (if timer runs out, run function "gameOver();")
  - wait for user to press button within the , and push that color to global "userArray" 
    - once userArray.length = simonArray.length:
      - we now know user has entered a sequence (whether correct or incorrect) that is same length as simons, so:
      - we can now check if userArray contains the same color sequence elements as simon
        - if yes/true:
          -stop timer
          - display eiter "Nice", "Woohoo", "YES"....randomly select phrase out of a predefined array on center circle
          - increment/move onto level 2, display "2" on center circle
          - go back to step 3
        - if no/false:
          - run function "gameOver();"
