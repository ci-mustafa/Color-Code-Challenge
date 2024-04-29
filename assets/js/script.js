// wait the DOM to finish loading before running the game
// get the start button and add event listener to it
document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("start-button");
    // add click event listener for start button to ran a function
    startButton.addEventListener("click", function() {
        // show game area div
        document.getElementById("game-area").style.display = "block";
        // hide start button
        startButton.style.display = "none";
    })
    
})