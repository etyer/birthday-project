const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// GRID (8x8 = 64 hücre)
const gridSize = 8;
const box = canvas.width / gridSize; // 50px

// SPEED
let speed = 180;
let game;

// SNAKE
let snake = [
  { x: 4 * box, y: 4 * box }
];

let direction = "RIGHT";

let score = 0;

let food = spawnFood();

// INPUT
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// FOOD SPAWN
function spawnFood() {
  return {
    x: Math.floor(Math.random() * gridSize) * box,
    y: Math.floor(Math.random() * gridSize) * box
  };
}

// GAME LOOP
function draw() {

  // canvas temizle (CSS background kalsın)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // SNAKE
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // FOOD
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // HEAD POSITION
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  // FOOD COLLISION
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = spawnFood();

    // 🔥 optional speed increase
    // if (score % 5 === 0 && speed > 60) {
    //   speed -= 5;
    //   restartGame();
    // }

  } else {
    snake.pop();
  }

  // GAME OVER
  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height
  ) {
    clearInterval(game);
    alert("Game Over");
    return;
  }

  snake.unshift({ x: headX, y: headY });
}

// START GAME
function startGame() {
  document.getElementById("startScreen").style.display = "none";

  clearInterval(game);
  game = setInterval(draw, speed);
}