
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-150;
canvas.height = window.innerHeight-150;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth-150;
    canvas.height = window.innerHeight-150;
});
// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const ballSize = 10;

// Paddle properties
const paddleHeight = 100;
const paddleWidth = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 5;

// Score properties
let leftScore = 0;
let rightScore = 0;

function draw() {
    // Draw canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw left paddle
    ctx.fillStyle = 'black';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

    // Draw right paddle
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw score
    ctx.font = '48px Arial';
    ctx.fillText(leftScore, canvas.width / 4, 50);
    ctx.fillText(rightScore, canvas.width * 3 / 4, 50);
}

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for ball collision with walls
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Check for ball collision with paddles
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedY *= Math.random();
        ballSpeedX = -ballSpeedX;

    } else if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Check for ball going out of bounds
    if (ballX - ballSize < 0) {
        rightScore++;
        resetBall();
    } else if (ballX + ballSize > canvas.width) {
        leftScore++;
        resetBall();
    }

    // Move paddles
    if (keys.ArrowUp) {
        rightPaddleY -= paddleSpeed;
    } else if (keys.ArrowDown) {
        rightPaddleY += paddleSpeed;
    }
    if (keys.w) {
        console.log("w pressed");
        leftPaddleY -= paddleSpeed;
    } else if (keys.s) {
        leftPaddleY += paddleSpeed;
    }

    // Keep paddles in bounds
    if (leftPaddleY < 0) {
        leftPaddleY = 0;
    } else if (leftPaddleY + paddleHeight > canvas.height) {
        leftPaddleY = canvas.height - paddleHeight;
    }
    if (rightPaddleY < 0) {
        rightPaddleY = 0;
    } else if (rightPaddleY + paddleHeight > canvas.height) {
        rightPaddleY = canvas.height - paddleHeight;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() * 10 - 5;
}

const keys = {};
window.addEventListener('keydown', function (event) {
    console.log("Key:" + event.key);
    keys[event.key] = true;
});
window.addEventListener('keyup', function (event) {
    keys[event.key] = false;
});

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

resetBall();
loop();
