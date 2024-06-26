// create list of color codes
const ColorCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

// Define a variable to store the generated color
let generatedColor;

// maximum attemps if user guess not correctly
let attempts = 10;


// wait the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("start-button");
    document.getElementById("user-name").focus();
    // add click event listener for start button to run a function
    startButton.addEventListener("click", startGame);
});

// create a variable to hold counter value
let hintCounter = 0;
// add click event listener to the hint button
document.getElementById("hint-button").addEventListener("click", function () {

    // display hint paragraph
    document.getElementById("hint-p").style.display = "block";

    // increament hint counter by every click
    hintCounter++;
    // get hint-value element
    let hintTextContent = document.getElementById("hint-value");
    // variable to store hint character
    let hintChar;
    // get message box text
    let messageBoXPElement = document.getElementById("message-box-text");
    // display hints based on hint counter
    if (hintCounter === 1) {
        // First hint: Show the first character of the color code
        hintChar = generatedColor.slice(1, 2);
        hintTextContent.textContent = hintChar + hintTextContent.textContent.slice(1);
        messageBoXPElement.textContent = "First hint revealed! you have 2 hints left.";
        showHintMessage();
    } else if (hintCounter === 2) {
        // Second hint: Show the last character of the color code
        hintChar = generatedColor.slice(-1);
        hintTextContent.textContent = hintTextContent.textContent.slice(0, 5) + hintChar;
        messageBoXPElement.textContent = "Second hint revealed! you have 1 hints left.";
        showHintMessage();
    } else if (hintCounter === 3) {
        // Third hint: Show the middle two characters of the color code
        hintChar = generatedColor.slice(3, 5);
        hintTextContent.textContent = hintTextContent.textContent.slice(0, 2) + hintChar + hintTextContent.textContent.slice(4);
        messageBoXPElement.textContent = "Final hint revealed! Last chance to guess.";
        showHintMessage();
        // Disable hint button after all hints are used
        let hintButton = document.getElementById("hint-button");
        hintButton.disabled = true;
        hintButton.style.backgroundColor = "#CCCCCC";
        hintButton.style.color = "black";
    }
})

// apply reset logic
document.getElementById("reset-button").addEventListener("click", function () {
    // make hintcounter to 0
    hintCounter = 0;
    // get hint button
    let hintButton = document.getElementById("hint-button");
    // make hint button disabled to false
    hintButton.disabled = false;
    // change the color and background color of hint button to default
    hintButton.style.color = "aquamarine";
    hintButton.style.backgroundColor = "#150734";
    // generate new color
    generatedColor = generateColor();
    document.getElementById("color-box").style.backgroundColor = generatedColor;
    // make text content of hint value to default
    document.getElementById("hint-value").textContent = "------";
    // hide hint paragraph
    document.getElementById("hint-p").style.display = "none";
    // get guess box focuse on it and make it's value to empty
    document.getElementById("guess-box").focus();
    document.getElementById("guess-box").value = "";
    // make attempt to default
    attempts = 10;
    // make attempt display to none
    let attemptPara = document.getElementById("attempt-p");
    attemptPara.style.display = "none";
    // make guess step info to none
    document.getElementById("guess-step").style.display = "none";

})
/**
 * Function to start the game and give the box a random color
 */
function startGame() {
    // username validation
    const userNameStartLength = 6;
    const userNameEndLenght = 8;
    let userName = document.getElementById("user-name").value;
    let userNameText = document.getElementById("user-name-validation-text");
    if (userName.length < userNameStartLength || userName.length > userNameEndLenght) {
        userNameText.textContent = "Username should be beteween 6 and 8 characters.";
    } else {
        // get hint button
        let hintButton = document.getElementById("hint-button");
        // change the color of hint button to default
        hintButton.style.color = "aquamarine";
        // show game area div
        document.getElementById("game-area").style.display = "block";
        // hide start screen
        document.getElementById("start-guess").style.display = "none";
        // get username text
        let userNameTextElement = document.getElementById("user-name-t");
        userNameTextElement.textContent = userName;
        // generate a random color
        generatedColor = generateColor();
        document.getElementById("color-box").style.backgroundColor = generatedColor;
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
    if (hintCounter === 0) {
        score += 4;
        dimondCounter += 1;
        let dimondElement = document.getElementById("dimond-text");
        let dimondElemetTextContent = dimondElement.textContent;
        let toInt = parseInt(dimondElemetTextContent)
        dimondElement.textContent = toInt += dimondCounter;
        dimondElement.style.fontFamily = "Chakra Petch, sans-serif";
    } else if (hintCounter === 1) {
        score += 3;
        goldCounter += 1;
        let goldElement = document.getElementById("gold-text");
        let goldElementTextContent = goldElement.textContent;
        let toInt = parseInt(goldElementTextContent)
        goldElement.textContent = toInt += goldCounter;
        goldElement.style.fontFamily = "Chakra Petch, sans-serif";
    } else if (hintCounter === 2) {
        score += 2;
        silverCounter += 1;
        let silverElement = document.getElementById("silver-text");
        let silverElementTextContent = silverElement.textContent;
        let toInt = parseInt(silverElementTextContent);
        silverElement.textContent = toInt += silverCounter;
        silverElement.style.fontFamily = "Chakra Petch, sans-serif";
    } else if (hintCounter === 3) {
        score += 1;
        bronzeCounter += 1;
        let bronzeElement = document.getElementById("bronze-text");
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

        // get info message box
        let infoMessageBoxElement = document.getElementById("info-message-box");

        // check user guess against generated color
        if (userGuess === generatedColor) {
            increaseScore(); // calling increaseScore function to increase score

            // show a congrats message when a user guess the correct color code
            infoMessageBoxElement.textContent = "Congratulations, you guessed right!";
            infoMessageBoxElement.style.display = "block";
            setTimeout(function () {
                infoMessageBoxElement.style.display = "none";
            }, 2000)

            startGame(); // generate a new color
            document.getElementById("guess-box").value = "";

            // Renew hint process and enable hint button
            hintCounter = 0;
            document.getElementById("hint-button").disabled = false;

            // change hint button color to default
            document.getElementById("hint-button").style.backgroundColor = "#150734";

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
                // show a failed message when a user can not guess the correct color code
                infoMessageBoxElement.textContent = "Oops! Incorrect guess! Try again.";
                infoMessageBoxElement.style.display = "block";
                setTimeout(function () {
                    infoMessageBoxElement.style.display = "none";
                }, 2000)
                pInfo.style.display = "block";
                attemptPara.style.display = "block";
            }

            // check if attempts are exhausted
            if (attempts === 0) {
                // if attempts is 0 and userGuess is equal to generatedColor, increase score and call startGame function
                if (userGuess === generatedColor) {
                    increaseScore();
                } else if (userGuess !== generatedColor) {
                    // if attempts is 0 and userGuess is not equal to generetedColor, decrease total score by 1 and
                    // show a message to the user
                    let scoreElement = document.getElementById("score");
                    let score = parseInt(scoreElement.textContent);
                    score -= 1;
                    scoreElement.textContent = score;
                    infoMessageBoxElement.textContent = "Sorry, you've used all your attempts and couldn't guess correctly. Score decreased by 1.";
                    infoMessageBoxElement.style.display = "block";
                    setTimeout(function () {
                        infoMessageBoxElement.style.display = "none";
                    }, 3000)
                }
                // Call startGame if attempts are 0, regardless of user's guess
                startGame();
                document.getElementById("guess-box").value = "";

                // Renew hint process and enable hint button
                hintCounter = 0;
                document.getElementById("hint-button").disabled = false;
                // change hint button color to default
                document.getElementById("hint-button").style.backgroundColor = "#150734";


                // make text content of hint value to default
                document.getElementById("hint-value").textContent = "------";

                // hide hint paragraph
                document.getElementById("hint-p").style.display = "none";
            }


        }
    });
}


/**
 * Function to show and style hint message
 */
function showHintMessage() {
    // get message box
    let hintMessageBox = document.getElementById("hint-message-box");
    hintMessageBox.style.display = "block"; // Display the message box
    // Apply styles
    hintMessageBox.style.position = "fixed";
    hintMessageBox.style.top = "50%";
    hintMessageBox.style.left = "50%";
    hintMessageBox.style.transform = "translate(-50%, -50%)";
    hintMessageBox.style.padding = "20px";
    hintMessageBox.style.backgroundColor = "#1F3044";
    hintMessageBox.style.color = "white";
    hintMessageBox.style.zIndex = "1000";
    hintMessageBox.style.width = "80%";
    hintMessageBox.style.boxShadow = "2px 2px 15px rgba(0, 0, 0, 0.9)";
}
// calling checkUserGuess function
checkUserGuess();
