let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let currentScoreDisplay = document.getElementById("current-score");
let highScoreDisplay = document.getElementById("high-score");


document.addEventListener("keypress", function() {
   if(started == false){
    console.log("game started");
    started = true;

    levelup();
   }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
      btn.classList.remove("flash");
    }, 250);

}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
      btn.classList.remove("userflash");
    }, 250);

}


function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    currentScoreDisplay.innerText = `Current Score: ${level - 1}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);
}
function checkAns(idx){
    // console.log("curr level: ", level);
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup, 1000);
        }
    }else{
        // Update high score if needed
        if(level - 1 > highScore){
            highScore = level - 1;
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }
        h2.innerHTML = `Game Over!Your score was <b>${level}</b> </br> press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    currentScoreDisplay.innerText = `Current Score: 0`;
}