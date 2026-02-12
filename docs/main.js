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

let vbx = 1;
const vby = 1; //ball vertical velocity will not change

let paddlePos = 0;
const paddleWidth = 12;
let ballPos = [Math.random()*50, 0];

let horizontalChange = 1;
let verticalChange = 1;
let score = 0;
let highscore = 0;

const ballMovement = setInterval(() => {

    if(ballPos[1] == 75) {
        if((ballPos[0] < paddlePos-1 || ballPos[0] > paddlePos + paddleWidth + 1)) {
            
            if(highscore < score) {
                highscore = score;
                document.getElementById("highscore").innerText = "HIGHSCORE: " + highscore;
            }
            score = 0;
            alert("Game Over");
            ballPos = [Math.random()*50, 0];
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

    ballPos = [ballPos[0] + horizontalChange*0.5, ballPos[1] + verticalChange*0.5];
    document.getElementById("circle").style.left = ballPos[0] + "vw";
    document.getElementById("circle").style.top = ballPos[1] + "vh";
}, 15);

document.body.addEventListener("keydown", function(event) {

    if(event.code == "ArrowRight" && event.repeat && paddlePos < 79) {
        paddlePos += 3;
        document.getElementById("rectangle").style.left = paddlePos + "vw";
    }
    if(event.code == "ArrowLeft" && paddlePos > 0) {
        paddlePos -= 3;
        document.getElementById("rectangle").style.left = paddlePos + "vw";
    }
});
