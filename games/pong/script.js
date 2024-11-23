const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Paddle and ball properties
const paddleWidth = 10,
  paddleHeight = 100,
  ballSize = 10;
const paddleSpeed = 5,
  ballSpeed = 4;
let ballDirectionX = 1,
  ballDirectionY = 1;

// Game state variables
let player1 = { x: 0, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
let player2 = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  score: 0,
};
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: ballSpeed * ballDirectionX,
  dy: ballSpeed * ballDirectionY,
};

// Draw paddle
function drawPaddle(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, ballSize, ballSize);
}

// Update ball position
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with top and bottom walls
  if (ball.y <= 0 || ball.y + ballSize >= canvas.height) {
    ball.dy = -ball.dy;
  }

  // Ball collision with paddles
  if (
    ball.x <= player1.x + paddleWidth &&
    ball.y >= player1.y &&
    ball.y <= player1.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  }

  if (
    ball.x + ballSize >= player2.x &&
    ball.y >= player2.y &&
    ball.y <= player2.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  }

  // Ball out of bounds
  if (ball.x <= 0) {
    player2.score += 1;
    resetBall();
  } else if (ball.x + ballSize >= canvas.width) {
    player1.score += 1;
    resetBall();
  }
}

// Reset ball position after scoring
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = ballSpeed * ballDirectionX;
  ball.dy = ballSpeed * ballDirectionY;
}

// Draw score
function drawScore() {
  ctx.font = "32px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Player 1: ${player1.score}`, 50, 50);
  ctx.fillText(`Player 2: ${player2.score}`, canvas.width - 150, 50);
}

// Move paddles
function movePaddles() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && player2.y > 0) {
      player2.y -= paddleSpeed;
    }
    if (e.key === "ArrowDown" && player2.y + paddleHeight < canvas.height) {
      player2.y += paddleSpeed;
    }

    if (e.key === "w" && player1.y > 0) {
      player1.y -= paddleSpeed;
    }
    if (e.key === "s" && player1.y + paddleHeight < canvas.height) {
      player1.y += paddleSpeed;
    }
  });
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle(player1.x, player1.y);
  drawPaddle(player2.x, player2.y);
  drawBall(ball.x, ball.y);
  drawScore();
  updateBall();
}

movePaddles();
setInterval(gameLoop, 1000 / 60); // 60 FPS
