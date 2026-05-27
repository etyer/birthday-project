const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// GRID
const gridSize = 8;
const box = canvas.width / gridSize;

// STATE
let isPlaying = false;
let game = null;

// GAME DATA
let snake = [];
let direction = "RIGHT";
let score = 0;

// ASSETS
const headImg = new Image();
headImg.src = "assets/images/snake_head.png";

const foodImg = new Image();
foodImg.src = "assets/images/food.png";

// FOOD
let food = spawnFood();

/* =========================
   INPUT
========================= */
document.addEventListener("keydown", (event) => {
  if (!isPlaying) return;

  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

/* =========================
   TOUCH FIX
========================= */
let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  if (!isPlaying) return;

  let dx = e.changedTouches[0].clientX - startX;
  let dy = e.changedTouches[0].clientY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && direction !== "LEFT") direction = "RIGHT";
    else if (dx < 0 && direction !== "RIGHT") direction = "LEFT";
  } else {
    if (dy > 0 && direction !== "UP") direction = "DOWN";
    else if (dy < 0 && direction !== "DOWN") direction = "UP";
  }
});

/* =========================
   FOOD
========================= */
function spawnFood() {
  let f;
  do {
    f = {
      x: Math.floor(Math.random() * gridSize) * box,
      y: Math.floor(Math.random() * gridSize) * box
    };
  } while (snake.some(s => s.x === f.x && s.y === f.y));

  return f;
}

/* =========================
   DRAW
========================= */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // FOOD
  ctx.drawImage(foodImg, food.x, food.y, box, box);

  // SNAKE
  ctx.beginPath();
  for (let i = 0; i < snake.length; i++) {
    let x = snake[i].x + box / 2;
    let y = snake[i].y + box / 2;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "#3cff7a";
  ctx.lineWidth = box * 0.9;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  // HEAD
  let head = snake[0];
  ctx.drawImage(headImg, head.x, head.y, box, box);

  // MOVE
  let headX = head.x;
  let headY = head.y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  // FOOD COLLISION
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;

    food = spawnFood();

    if (score >= 40) {
      endGame("win");
      return;
    }
  } else {
    snake.pop();
  }

  // GAME OVER
  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height
  ) {
    endGame("lose");
    return;
  }

  snake.unshift({ x: headX, y: headY });
}

/* =========================
   START
========================= */
function startGame() {
  snake = [{ x: 4 * box, y: 4 * box }];
  direction = "RIGHT";
  score = 0;

  document.getElementById("score").innerText = "Score: 0";

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("gameOverScreen").classList.add("hidden");

  isPlaying = true;

  clearInterval(game);
  game = setInterval(draw, 180);
}

/* =========================
   END GAME
========================= */
function endGame(type) {
  isPlaying = false;
  clearInterval(game);
  game = null;

  if (type === "win") {
    document.getElementById("winScreen").classList.remove("hidden");
  } else {
    document.getElementById("gameOverScreen").classList.remove("hidden");
  }
}

/* =========================
   RESTART
========================= */
function restartGame() {
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("gameOverScreen").classList.add("hidden");

  startGame();
}

/* =========================
   CLICK EVENTS
========================= */
document.addEventListener("click", (e) => {
  if (e.target.id === "restartBtn" || e.target.id === "restartBtn2") {
    restartGame();
  }
});