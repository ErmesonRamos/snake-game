//Elementos
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Variáveis
let direction, loopId;
const snake = [
  { x: 270, y: 270 },
  { x: 300, y: 270 },
];
const size = 30;
const food = {
  x: 90,
  y: 90,
  color: "orange"
}

//Funções
const drawSnake = () => {
  snake.forEach((position, index) => {
    if (index == snake.length - 1) {
      ctx.fillStyle = "white";
    } else {
      ctx.fillStyle = "#ddd";
    }
    ctx.fillRect(position.x, position.y, size, size);
  });
};

const moveSnake = () => {
  if (!direction) return;
  const head = snake[snake.length - 1];
  if (direction == "Right") {
    snake.push({ x: head.x + size, y: head.y });
  }
  if (direction == "Left") {
    snake.push({ x: head.x - size, y: head.y });
  }
  if (direction == "Up") {
    snake.push({ x: head.x, y: head.y - size });
  }
  if (direction == "Down") {
    snake.push({ x: head.x, y: head.y + size });
  }
  snake.shift();
};

const drawGrid = () => {
  ctx.strokeStyle = "#191919";
  ctx.lineWidth = 1;
  for(let i = size; i < canvas.width; i += size) {
    //Linhas Verticais
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
    //Linhas Horizontais
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
};

const drawFood = () => {
  const { x, y, color } = food;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.shadowBlur = 0;
};

document.addEventListener("keydown", ({ key }) => {
  if (key === "ArrowRight" && direction !== "Left") {
    direction = "Right";
  }
  if (key === "ArrowLeft" && direction !== "Right") {
    direction = "Left";
  }
  if (key === "ArrowUp" && direction !== "Down") {
    direction = "Up";
  }
  if (key === "ArrowDown" && direction !== "Up") {
    direction = "Down";
  }
});

const gameLoop = () => {
  clearInterval(loopId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFood();
  drawGrid();
  drawSnake();
  moveSnake();

  loopId = setTimeout(() => {
    gameLoop();
  }, 300)
}

gameLoop();