var randomNumber = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressed = false;
var level = 1;
var sequencesMatch = false;
var numberOfButtons = document.querySelectorAll(".btn").length;

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    return randomNumber
}

document.addEventListener("keydown", function(event) {
    keyPressed = true;
    document.querySelector("h1").innerHTML = "Level " + level;
    var randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    var randomButton = document.querySelector("." + randomChosenColour);
    $(randomButton).fadeOut(100).fadeIn(100);
    var randomButtonsoundPath = "sounds/" + randomChosenColour + ".mp3";
    var randomButtonSound = new Audio(randomButtonsoundPath);
    randomButtonSound.play();
});

for (var i = 0; i < numberOfButtons; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        var clickedButton = this;
        var clickedButtonID = this.id;
        var soundPath = "sounds/" + clickedButtonID + ".mp3";
        var randomSound = new Audio(soundPath);
        randomSound.play();
        clickedButton.classList.add("pressed");
        setTimeout(function() {
            clickedButton.classList.remove("pressed");
        }, 100);
        if (keyPressed) {
            userClickedPattern.push(clickedButtonID);
            if (gamePattern.length === userClickedPattern.length) {
                for (var j = 0; j < gamePattern.length; j++) {
                    if (gamePattern[j] != userClickedPattern[j]) {
                        sequencesMatch = false;
                        document.querySelector("h1").innerHTML = "You lost!";
                    } else {
                        sequencesMatch = true;
                    }
                }
            }
            if (sequencesMatch = true) {
                level = level + 1;
                document.querySelector("h1").innerHTML = "Level " + level;
            }
        }
    });
}