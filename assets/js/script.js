// create list of color codes
const ColorCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

// Define a variable to store the generated color
let generatedColor;

// wait the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("start-button");
    // add click event listener for start button to run a function
    startButton.addEventListener("click", startGame);
});

/**
 * Function to start the game and give the box a random color
 */
function startGame() {
    // show game area div
    document.getElementById("game-area").style.display = "block";
    // hide start button
    document.getElementById("start-button").style.display = "none";
    // generate a random color
    generatedColor = generateColor();
    document.getElementById("color-box").style.backgroundColor = generatedColor;
    console.log(generatedColor);
}

/**
 * Function to generate a random color using color list codes and return it
 */
function generateColor() {
    let startCode = "#";
    let colorCodeLength = 6;
    for (let i = 0; i < colorCodeLength; i++) {
        let indexColorCode = Math.floor(Math.random() * ColorCodeList.length);
        startCode += ColorCodeList[indexColorCode];
    }
    return startCode;
}

/**
 * Function to get user input
 */
function getUserGuess() {
    return document.getElementById("guess-box").value.toLowerCase(); // Get the value of input box
}

/**
 * Function to check user Guess against generated random color
 */
function checkUserGuess() {
    // get submit button and add a click event listener to it
    document.getElementById("submit").addEventListener("click", function () {

        // store input user in a variable
        let userGuess = getUserGuess();

        // validate user input
        if (userGuess.length === 0) {
            let valiText = document.getElementById("validation-text");
            valiText.textContent = "Color code cannot be empty";
            valiText.style.display = "block";
        } else if (userGuess.length < 7 || userGuess.length > 7) {
            let valiText = document.getElementById("validation-text");
            valiText.textContent = "Ensure color code length is 7";
            valiText.style.display = "block";
        } else if (! userGuess.startsWith("#")) {
            let valiText = document.getElementById("validation-text");
            valiText.textContent = "Color code must start with #";
            valiText.style.display = "block";
        }

        // check user guess against generated color
        if (userGuess === generatedColor) {
            increaseScore(); // calling increaseScore function to increase score
            startGame(); // generate a new color
            document.getElementById("guess-box").value = "";
        } else {
            // alert("Oops! That's not the correct color. Try again!");

        }
    });
}

/**
 * Function to increase score
 */
function increaseScore() {
    let scoreElement = document.getElementById("score");
    let score = parseInt(scoreElement.textContent);
    score += 1;
    scoreElement.textContent = score;
}

// calling checkUserGuess function
checkUserGuess();
