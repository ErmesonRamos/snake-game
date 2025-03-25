//Elementos
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const score = document.querySelector(".score--value");
const scoreFinal = document.querySelector(".final-score");
const menuScreen = document.querySelector(".menu-screen");
const btnPlay = document.querySelector(".btn-play");

//Variáveis
let direction, loopId;
let snake = [{ x: 270, y: 300 }];
const size = 30;

//Funções
const incrementScore = () => {
  score.innerText = parseInt(score.innerText) + 10;
}
const drawSnake = () => {
  ctx.fillStyle = "#ddd";
  snake.forEach((position, index) => {
    if (index == snake.length - 1) {
      ctx.fillStyle = "white";
    }
    ctx.fillRect(position.x, position.y, size, size);
  });
};

const moveSnake = () => {
  if (!direction) return;
  const head = snake.at(-1);
  if (direction == "right") {
    snake.push({ x: head.x + size, y: head.y });
  }
  if (direction == "left") {
    snake.push({ x: head.x - size, y: head.y });
  }
  if (direction == "up") {
    snake.push({ x: head.x, y: head.y - size });
  }
  if (direction == "down") {
    snake.push({ x: head.x, y: head.y + size });
  }
  snake.shift();
};

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#191919";
  for(let i = 30; i < canvas.width; i += 30) {
    //Linhas Horizontais
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
    //Linhas Verticais
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 600);
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
    snake.push(head);
    incrementScore()

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
  menuScreen.style.display = "flex";
  scoreFinal.textContent = score.textContent;
  canvas.style.filter = "blur(2px)";
}

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

document.addEventListener("keydown", ({ key }) => {
  if (key === "ArrowRight" && direction !== "Left") {
    direction = "right";
  }
  if (key === "ArrowLeft" && direction !== "Right") {
    direction = "left";
  }
  if (key === "ArrowUp" && direction !== "Down") {
    direction = "up";
  }
  if (key === "ArrowDown" && direction !== "Up") {
    direction = "down";
  }
});

btnPlay.addEventListener("click", () => {
  menuScreen.style.display = "none"; 
  score.innerText = "00";
  canvas.style.filter = "none";
  snake = [ { x: 270, y: 300 } ];
});
