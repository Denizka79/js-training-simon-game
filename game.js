var randomNumber = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressed = false;
var level = 1;
var sequencesMatch = false;
var clicksCounter = 0;
var numberOfButtons = document.querySelectorAll(".btn").length;

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    return randomNumber
}
function randomButtonFlash(lev) {
    document.querySelector("h1").innerHTML = "Level " + lev;
    var randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    var randomButton = document.querySelector("." + randomChosenColour);
    $(randomButton).fadeOut(100).fadeIn(100);
    var randomButtonsoundPath = "sounds/" + randomChosenColour + ".mp3";
    var randomButtonSound = new Audio(randomButtonsoundPath);
    randomButtonSound.play();
}

document.addEventListener("keydown", function(event) {
    if (!keyPressed) {
        keyPressed = true;
        userClickedPattern = [];
        randomButtonFlash(level);
    }
});

for (var i = 0; i < numberOfButtons; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        var clickedButton = this;
        var clickedButtonID = this.id;
        userClickedPattern.push(clickedButtonID);
        var soundPath = "sounds/" + clickedButtonID + ".mp3";
        var randomSound = new Audio(soundPath);
        randomSound.play();
        clickedButton.classList.add("pressed");
        setTimeout(function() {
            clickedButton.classList.remove("pressed");
        }, 100);
        if (keyPressed) {
            if (gamePattern.length === userClickedPattern.length) {
                var j = 0;
                sequencesMatch = true;
                while (j < gamePattern.length) {
                    if (gamePattern[j] != userClickedPattern[j]) {
                        document.querySelector("h1").innerHTML = "You lost! Press a key to restart.";
                        sequencesMatch = false;
                        gamePattern = [];
                        userClickedPattern = [];
                        level = 1;
                        keyPressed = false;
                    } else {
                        j = j + 1;
                    }
                }
                if (sequencesMatch) {
                    console.log("Match!");
                    level = level + 1;
                    userClickedPattern = [];
                    setTimeout(function() {
                        document.querySelector("h1").innerHTML = "Level " + level;
                        var randomChosenColour = buttonColours[nextSequence()];
                        gamePattern.push(randomChosenColour);
                        var randomButton = document.querySelector("." + randomChosenColour);
                        $(randomButton).fadeOut(100).fadeIn(100);
                        var randomButtonsoundPath = "sounds/" + randomChosenColour + ".mp3";
                        var randomButtonSound = new Audio(randomButtonsoundPath);
                        randomButtonSound.play();
                    }, 1000);
                }
            }
        }
    });
}