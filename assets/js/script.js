// create list of color codes
const ColorCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]

// wait the DOM to finish loading before running the game
// get the start button and add event listener to it
document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("start-button");
    // add click event listener for start button to ran a function
    startButton.addEventListener("click", startGame);
    
})

/**
* Function to start the game and give the box a random color
 */
function startGame() {
    // show game area div
    document.getElementById("game-area").style.display = "block";
    // hide start button
    document.getElementById("start-button").style.display = "none";
    // generate a random color
    document.getElementById("color-box").style.backgroundColor = generateColor();
}

/**
 * Function to generate a random color using color list codes and return it
 */
function generateColor() {
    let startCode = "#";
    let colorCodeLength = 6;
    let generatePeriod = 0;
    while (generatePeriod < colorCodeLength) {
        let indexColorCode = Math.floor(Math.random() * ColorCodeList.length);
        startCode += ColorCodeList[indexColorCode];
        generatePeriod ++;

    }
    return startCode;
    
}






