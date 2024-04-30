// create list of color codes
const ColorCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

// Define a variable to store the generated color
let generatedColor;

// maximum attemps if user guess not correctly
let attempts = 7;


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
    // access guess-step paragraph and attemp-p paragraph
    let pInfo = document.getElementById("guess-step");
    let attemptPara = document.getElementById("attempt-p");
    // if display prop is block change it to none
    if (pInfo.style.display === "block" || attemptPara.style.display === "block") {
        pInfo.style.display = "none";
        attemptPara.style.display = "none";
    }

    // change attempts to defualt
    attempts = 7;

    // access validation text
    let valiText = document.getElementById("validation-text");
    if (valiText.style.display === "block") {
        valiText.style.display = "none";
    }
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
 * Function to increase score
 */
function increaseScore() {
    let scoreElement = document.getElementById("score");
    let score = parseInt(scoreElement.textContent);
    score += 1;
    scoreElement.textContent = score;
}
/**
 * Function to validate userinput
 */
function validateUserInput() {
    // store input user in a variable
    let userGuess = getUserGuess();
    // validate user input
    if (userGuess.length === 0) {
        let valiText = document.getElementById("validation-text");
        valiText.textContent = "Color code cannot be empty";
        valiText.style.display = "block";
        return false;
    } else if (userGuess.length !== 7) {
        let valiText = document.getElementById("validation-text");
        valiText.textContent = "Ensure color code length is 7";
        valiText.style.display = "block";
        return false;
    } else if (!userGuess.startsWith("#")) {
        let valiText = document.getElementById("validation-text");
        valiText.textContent = "Color code must start with #";
        valiText.style.display = "block";
        return false;
    } else {
        // Clear any previous validation messages and hide them
        let valiText = document.getElementById("validation-text");
        valiText.textContent = ""; // Clear the text content
        valiText.style.display = "none"; // Hide the validation message if it was displayed
        return true;
    }
}

/**
 * Function to check user Guess against generated random color
 */
function checkUserGuess() {
    // get submit button and add a click event listener to it
    document.getElementById("submit").addEventListener("click", function () {

        // store input user in a variable
        let userGuess = getUserGuess();
        // call validateuserinput function
        validateUserInput();

        // check user guess against generated color
        if (userGuess === generatedColor) {
            increaseScore(); // calling increaseScore function to increase score
            startGame(); // generate a new color
            document.getElementById("guess-box").value = "";
        } else {
            // if validateuserinput function return true perform decrement
            if (validateUserInput()) {
                // attempt decrement
                attempts--;
            }
            
            // array to store correct guesses
            let correctGuesses = [];
            for (let i = 0; i < userGuess.length; i++) {
                if (generatedColor[i] === userGuess[i]) {
                    correctGuesses.push([i, userGuess[i]]);
                }
            }

            // get p and span elements by id
            let pInfo = document.getElementById("guess-step");
            let pIndex = document.getElementById("index");
            let pValue = document.getElementById("value");
            let attemptPara = document.getElementById("attempt-p");
            let attemptValue = document.getElementById("attempt");

            // Clear previous entries
            pIndex.textContent = "";
            pValue.textContent = "";

            // assign p index and p value to correct guesses inside array
            for (let i = 0; i < correctGuesses.length; i++) {
                pIndex.textContent += correctGuesses[i][0] + ", ";
                pValue.textContent += correctGuesses[i][1] + ", ";
            }

            attemptValue.textContent = attempts;
            attemptPara.style.display = "block";
            pInfo.style.display = "block";

            // check if attempts are exhausted
            if (attempts === 0) {
                // if attempts is 0 and userGuess is equal to generatedColor, increase score and call startGame function
                if (userGuess === generatedColor) {
                    increaseScore();
                }
                // Call startGame if attempts are 0, regardless of user's guess
                startGame();
                let scoreElement = document.getElementById("score");
                scoreElement.textContent = 0;
                document.getElementById("guess-box").value = "";
            }


        }
    });
}

// calling checkUserGuess function
checkUserGuess();
