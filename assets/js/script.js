// create list of color codes
const ColorCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

// Define a variable to store the generated color
let generatedColor;

// maximum attemps if user guess not correctly
let attempts = 10;


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
    // hide start screen
    document.getElementById("start-guess").style.display = "none";
    // generate a random color
    generatedColor = generateColor();
    document.getElementById("color-box").style.backgroundColor = generatedColor;
    console.log(generatedColor);
    // get guess box and focus on it
    document.getElementById("guess-box").focus();
    // access guess-step paragraph and attemp-p paragraph
    let pInfo = document.getElementById("guess-step");
    let attemptPara = document.getElementById("attempt-p");
    // if display prop is block change it to none
    if (pInfo.style.display === "block" || attemptPara.style.display === "block") {
        pInfo.style.display = "none";
        attemptPara.style.display = "none";
    }

    // change attempts to defualt
    attempts = 10;

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
    let dimondCounter = 0;
    let goldCounter = 0;
    let silverCounter = 0;
    let bronzeCounter = 0;
    let scoreElement = document.getElementById("score");
    let score = parseInt(scoreElement.textContent);
    // increase score based hint uses
    if(hintCounter === 0) {
        score += 4;
        dimondCounter += 1;
        let dimondElement = document.getElementById("dimond");
        let dimondElemetTextContent = dimondElement.textContent;
        let toInt = parseInt(dimondElemetTextContent)
        dimondElement.textContent =  toInt += dimondCounter;
        dimondElement.style.fontFamily = "Chakra Petch, sans-serif";
    } else if (hintCounter === 1) {
        score += 3;
        goldCounter +=1 ;
        let goldElement = document.getElementById("gold");
        let goldElementTextContent = goldElement.textContent;
        let toInt = parseInt(goldElementTextContent)
        goldElement.textContent = toInt += goldCounter;
        goldElement.style.fontFamily = "Chakra Petch, sans-serif";
    } else if (hintCounter === 2) {
        score += 2;
        silverCounter += 1;
        let silverElement = document.getElementById("silver");
        let silverElementTextContent = silverElement.textContent;
        let toInt = parseInt(silverElementTextContent);
        silverElement.textContent = toInt += silverCounter;
        silverElement.style.fontFamily = "Chakra Petch, sans-serif";
    } else if (hintCounter === 3) {
        score += 1;
        bronzeCounter += 1;
        let bronzeElement = document.getElementById("bronze");
        let bronzeElementTextContent = bronzeElement.textContent;
        let toInt = parseInt(bronzeElementTextContent);
        bronzeElement.textContent = toInt += bronzeCounter;
        bronzeElement.style.fontFamily = "Chakra Petch, sans-serif";
    }
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

        // get guess box and focus on it
        document.getElementById("guess-box").focus();

        // store input user in a variable
        let userGuess = getUserGuess();

        // call validateuserinput function
        validateUserInput();

        // check user guess against generated color
        if (userGuess === generatedColor) {
            increaseScore(); // calling increaseScore function to increase score
            startGame(); // generate a new color
            document.getElementById("guess-box").value = "";

            // Renew hint process and enable hint button
            hintCounter = 0;
            document.getElementById("hint-button").disabled = false;

            // make text content of hint value to default
            document.getElementById("hint-value").textContent = "------";

            // hide hint paragraph
            document.getElementById("hint-p").style.display = "none";
        } else {
            // if validateuserinput function return true perform decrement
            if (validateUserInput()) {
                // attempt decrement
                attempts--;
            } else {
                // when submit button for second time pressed, make validation text color to black
                document.getElementById("submit").addEventListener("click", function () {
                    let valiText = document.getElementById("validation-text");
                    valiText.style.color = "red";
                    // set a timeout to change font color to default
                    setTimeout(function () {
                        valiText.style.color = "";
                    }, 200)
                })

            }
            // list to store correct guesses
            let correctGuesses = [];
            for (let i = 1; i < userGuess.length; i++) {
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

            // assign attempts to the textContent of attemptValue
            attemptValue.textContent = attempts;

            // check if userinput is less then 7 char or not include # symbol 
            // do not display guess steps paragraph and attempt paragraph
            let guessBoxValue = document.getElementById("guess-box").value;
            if (guessBoxValue.length !== 7 || !guessBoxValue.includes("#")) {
                pInfo.style.display = "none";
                attemptPara.style.display = "none";
            } else {
                pInfo.style.display = "block";
                attemptPara.style.display = "block";
            }
            
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

                // Renew hint process and enable hint button
                hintCounter = 0;
                document.getElementById("hint-button").disabled = false;

                // make text content of hint value to default
                document.getElementById("hint-value").textContent = "------";

                // hide hint paragraph
                document.getElementById("hint-p").style.display = "none";
            }


        }
    });
}
// create a variable to hold counter value
let hintCounter = 0;
// add click event listener to the hint button
document.getElementById("hint-button").addEventListener("click", function() {
    
    // display hint paragraph
    document.getElementById("hint-p").style.display = "block";

    // increament hint counter by every click
    hintCounter ++;
    // get hint-value element
    let hintTextContent = document.getElementById("hint-value");
    // variable to store hint character
    let hintChar;
    // display hints based on hint counter
    if (hintCounter === 1) {
        // First hint: Show the first character of the color code
        window.alert("First hint revealed! you have 2 hints left.");
        hintChar = generatedColor.slice(1, 2);
        hintTextContent.textContent = hintChar + hintTextContent.textContent.slice(1);
    } else if (hintCounter === 2) {
        // Second hint: Show the last character of the color code
        window.alert("Second hint revealed! you have 1 hints left.");
        hintChar = generatedColor.slice(-1);
        hintTextContent.textContent = hintTextContent.textContent.slice(0, 5) + hintChar ;
    } else if (hintCounter === 3) {
        // Third hint: Show the middle two characters of the color code
        window.alert("Final hint revealed! Last chance to guess.");
        hintChar = generatedColor.slice(3, 5);
        hintTextContent.textContent = hintTextContent.textContent.slice(0, 2) + hintChar + hintTextContent.textContent.slice(4);
        // Disable hint button after all hints are used
        document.getElementById("hint-button").disabled = true;
    }
})
// calling checkUserGuess function
checkUserGuess();
