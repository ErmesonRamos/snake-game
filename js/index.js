//Elementos
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Variáveis
let direction, loopId;
const snake = [ { x: 240, y: 270 } ];
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

const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomColor = () => {
  const red = randomNumber(0, 255);
  const green = randomNumber(0, 255);
  const blue = randomNumber(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

const randomPosition = () => {
  const number = randomNumber(0, canvas.width - size);
  return Math.round(number / 30) * 30;
};

const checkEat = () => {

  const head = snake.at(-1);

  if(head.x == food.x && head.y == food.y) {
    snake.push({ x: head.x, y: head.y });

    let x = randomPosition();
    let y = randomPosition();

    while(snake.find((position) => position.x == x && position.y == y )) {
      x = randomPosition();
      y = randomPosition();
    }

    food.x = x;
    food.y = y;
    food.color = randomColor();
  }
 
};

const food = {
  x: randomPosition(),
  y: randomPosition(),
  color: randomColor()
};

const checkCollision = () => {
  const head = snake.at(-1);
  const canvasLimit = canvas.width - size;
  const nextIndex = snake.length - 2;

  const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

  const selfCollision = snake.find((position, index) => {
    return index < nextIndex && position.x == head.x && position.y == head.y;
  });

  if(wallCollision || selfCollision) {
    gameOver();
  }
}

const gameOver = () => {
  direction = undefined;
}

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
  checkCollision();
  checkEat();

  loopId = setTimeout(() => {
    gameLoop();
  }, 300)
};

gameLoop();