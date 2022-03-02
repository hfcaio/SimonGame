var seq = [];
var userSeq = [];
var level = 0;
var control = 0;
var clicked = 0;

var colors = ["green", "red", "yellow", "blue"];

// main

$(document).on("keydown", function () {
    control++;
    if (control === 1) {
        $("h1").text("level " + level);
        createSequence();
        checkUserSequence();
    }
});

// functions
function makeSound(id) {
    var audio = new Audio("./sounds/" + id + ".mp3");
    audio.play();
}

function buttonClick(id) {
    // console.log("id: " + id);
    $("#" + id).toggleClass("pressed");
    setTimeout(function () {
        $("#" + id).toggleClass("pressed");
    }, 100);
}

function randomInt(min, max) {
    var num = Math.floor(Math.random() * (max - min) + min);
    return num;
}

function createSequence() {
    //change level
    level++;
    $("h1").text("level " + level);

    //creating new color
    var index_new_color = randomInt(0, 3);
    var new_color = colors[index_new_color];

    //pushing new color to the array
    seq.push(new_color);
    console.log("sequence: " + seq);

    //showing button pattern
    makeSound(new_color);
    $("#" + new_color)
        .animate({ opacity: 0.5 })
        .animate({ opacity: 1 });

    clicked = 0;
}

function checkUserSequence() {
    $(".btn").on("click",function () {
        makeSound(this.id);
        buttonClick(this.id);
        clicked++;
        if (clicked === 1) userSeq = [];
        console.log("clicked: " + clicked);
        userSeq.push(this.id);
        console.log("userSeq: " + userSeq);
        if (clicked === seq.length) checkAnswers(); 
    });
}

function checkAnswers() {
    var pass = true;
    console.log("checkAnswers");
    for (var i = 0; i < seq.length; i++) {
        if (seq[i] !== userSeq[i]) {
            pass = false;
            break;
        }
    }

    if (pass) {
        createSequence();
    } else {
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 100);
        makeSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("fail");
        seq = [];
        userSeq = [];
        level = 0;
        control = 0;
        clicked = 0;
        $(".btn").off("click");
    }
}
