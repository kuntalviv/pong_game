/**             100vw
 * ==================================
 * |                                |
 * |                ball            |
 * |                                |
 * |                                |100vh
 * |                                |
 * |                                |
 * |                12vw            |
 * |             ==========         |
 * ==================================
 */


const vp = 1; //actual paddle velcity depends upon OS's keyboard repeat rate which is unknown in browser, adjust to make it feel right :)

let vbx = Math.random()*100;
const vby = 1; //ball vertical velocity will not change

let paddlePos = 0;
let paddleTwoPos = 0;
const paddleWidth = 12;
let ballPos = [Math.random()*100, 3];

let horizontalChange = 1;
let verticalChange = 1;
let score = 0;
let highscore = 0;

let onePaddle = false;
let twoPaddle = false;

const ball = document.getElementById("circle");

let ballspeed = 80;
const paddle = document.getElementById("rectangle");
const paddleTwo = document.getElementById("rectangle2");


const pause = document.getElementById("pausebutton");
const stopBall = () => {
    if(pause.innerText === "Pause") {
        clearInterval(ballMovement);
        pause.innerText = "Resume";
    } else {
        ballMovement = setInterval(ballMovementFunction, 100-ballspeed);
        pause.innerText = "Pause";
    }
}

const selectOnePaddle = () => {
    onePaddle = true;
    twoPaddle = false;
    score = 0;
    ballPos = [Math.random()*100, 3];
    paddleTwo.style.display = "none";

}
const selectTwoPaddle = () => {
    onePaddle = false;
    twoPaddle = true;
    score = 0;
    ballPos = [Math.random()*100, 3];
    paddleTwo.style.display = "block";
}

const playMusic = () => {
    (new Audio("bgmusic.mp3")).play();  
};

const ballMovementFunction = () => {

    if(ballPos[1] >= 75) {
        if((ballPos[0] <= paddlePos-1) || (ballPos[0] >= paddlePos + paddleWidth)) {
            
            if(highscore < score) {
                highscore = score;
                document.getElementById("highscore").innerText = "HIGHSCORE: " + highscore;
            }
            score = 0;
            alert("Game Over");
            pause.innerText = "Pause";
            ballspeed = 80;
            ballPos = [Math.random()*100, 3];
        }
        else {
            score += 1;
        }
    }
    else if(ballPos[1] <= 1 && twoPaddle) {
        if((ballPos[0] <= paddleTwoPos-1) || (ballPos[0] >= paddleTwoPos + paddleWidth)) {
            
            if(highscore < score) {
                highscore = score;
                document.getElementById("highscore").innerText = "HIGHSCORE: " + highscore;
            }
            score = 0;
            alert("Game Over");
            pause.innerText = "Pause";
            ballspeed = 80;
            ballPos = [Math.random()*100, 70];
        }
        else {
            score += 1;
        }
    }

    
    document.getElementById("score").innerText = "SCORE: " + score;
    if(ballPos[0] >= 90) horizontalChange = -1;
    if(ballPos[0] <= 0) horizontalChange = 1;
    if(ballPos[1] >= 75) verticalChange = -1;
    if(ballPos[1] <= 1) verticalChange = 1;

    ballPos = [ballPos[0] + horizontalChange*0.5 + horizontalChange*score*2/100, ballPos[1] + verticalChange*0.5 + verticalChange*score*2/100];
    ball.style.left = ballPos[0] + "vw";
    ball.style.top = ballPos[1] + "vh";
};

let ballMovement = setInterval(ballMovementFunction, 100-ballspeed);


function onBallSpeedChange(e) {
    ballspeed = e.target.value;
    clearInterval(ballMovement);
    if(pause.innerText !== "Resume") {
        ballMovement = setInterval(ballMovementFunction, 100-ballspeed);    
    }
    
}


document.body.addEventListener("keydown", function(event) {
    
    if(event.code == "ArrowRight" && paddlePos < 79) {
        paddlePos += 5;
        paddle.style.left = paddlePos + "vw";
    }
    if(event.code == "ArrowLeft" && paddlePos > 0) {
        paddlePos -= 5;
        paddle.style.left = paddlePos + "vw";
    }
    if(event.code == "KeyD" && paddleTwoPos < 79) {
        paddleTwoPos += 5;
        paddleTwo.style.left = paddleTwoPos + "vw";
    }
    if(event.code == "KeyA" && paddleTwoPos > 0) {
        paddleTwoPos -= 5;
        paddleTwo.style.left = paddleTwoPos + "vw";
    }
});
