const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Each block of the snake and food will be 20px
const canvasSize = 400; // 400px x 400px canvas size
let snake = [{ x: 200, y: 200 }]; // Snake starts in the center of the canvas
let direction = "RIGHT";
let food = generateFood();
let gameInterval;

function startGame() {
  gameInterval = setInterval(() => {
    clearCanvas();
    moveSnake();
    drawFood();
    drawSnake();
    checkGameOver();
  }, 100);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "LEFT") head.x -= gridSize;
  if (direction === "RIGHT") head.x += gridSize;
  if (direction === "UP") head.y -= gridSize;
  if (direction === "DOWN") head.y += gridSize;

  snake.unshift(head);

  // Check if the snake eats food
  if (head.x === food.x && head.y === food.y) {
    food = generateFood(); // Generate new food
  } else {
    snake.pop(); // Remove the tail unless food was eaten
  }
}

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "lime";
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function generateFood() {
  const foodX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  const foodY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  return { x: foodX, y: foodY };
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function checkGameOver() {
  const head = snake[0];

  // Check if the snake hits the walls
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize
  ) {
    endGame();
  }

  // Check if the snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }
}

function endGame() {
  clearInterval(gameInterval);
  alert("Game Over! Press OK to restart.");
  resetGame();
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";
  food = generateFood();
  startGame();
}

function changeDirection(event) {
  const keyPressed = event.key;

  if (keyPressed === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (keyPressed === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (keyPressed === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (keyPressed === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}

document.addEventListener("keydown", changeDirection);

startGame();
