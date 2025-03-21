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

document.addEventListener("keydown", ({ key }) => {
  if (key === "ArrowRight") {
    direction = "Right";
  }
  if (key === "ArrowLeft") {
    direction = "Left";
  }
  if (key === "ArrowUp") {
    direction = "Up";
  }
  if (key === "ArrowDown") {
    direction = "Down";
  }
});

const gameLoop = () => {
  clearInterval(loopId)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  moveSnake();

  loopId = setTimeout(() => {
    gameLoop();
  }, 300)
}

gameLoop();
