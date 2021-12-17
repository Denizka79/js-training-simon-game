var randomNumber = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var numberOfButtons = document.querySelectorAll(".btn").length;

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    return randomNumber
}

var randomChosenColour = buttonColours[nextSequence()];

var selectedButton = document.querySelector("." + randomChosenColour);

for (var i = 0; i < numberOfButtons; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        var clickedButton = this;
        var clickedButtonID = this.id;
        //$(clickedButton).fadeOut(100).fadeIn(100);
        var soundPath = "sounds/" + clickedButtonID + ".mp3";
        var randomSound = new Audio(soundPath);
        randomSound.play();
        clickedButton.classList.add("pressed");
        setTimeout(function() {
            clickedButton.classList.remove("pressed");
        }, 100);
        userClickedPattern.push(clickedButtonID);
        console.log(userClickedPattern);
    });
}