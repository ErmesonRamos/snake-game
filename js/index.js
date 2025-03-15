const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [{ x: 270, y: 240 }];

const food = {
  x: 90,
  y: 90,
  color: 'yellow'
};

let direction, loopId;

const drawSnake = () => {
  ctx.fillStyle = "#ddd";
  snake.forEach((position, index) => {
    if (index == snake.length - 1) {
      ctx.fillStyle = "white"
    }
    ctx.fillRect(position.x, position.y, size, size);
  });

  
}

const moveSnake = () => {
  if (!direction) return;

  const head = snake.at(-1);

  if (direction == "right") {
    snake.push({x: head.x + size, y: head.y});
  }
  if (direction == "left") {
    snake.push({x: head.x - size, y: head.y});
  }
  if (direction == "up") {
    snake.push({x: head.x , y: head.y - size});
  }
  if (direction == "down") {
    snake.push({x: head.x , y: head.y + size});
  }
  
  snake.shift();
}

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "white";//#191919

  for(let i = 30; i < canvas.width; i += 30) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 600);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
  }
  
}

const drowFood = () => {
  const { x, y , color } = food;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.shadowBlur = 0;
}

const gameLoop = () => {
  
  clearInterval(loopId);

  ctx.clearRect(0, 0, 600, 600);
  drawGrid();
  drowFood();
  moveSnake();
  drawSnake();

  loopId = setTimeout(() => {
    gameLoop();
  }, 300);
}

gameLoop();

document.addEventListener("keydown", ({key}) => {
  if(key === "ArrowRight" && direction !== "left" ) {
    direction = "right";
  }
  if(key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  }
  if(key === "ArrowUp" && direction !== "down") {
    direction = "up";
  }
  if(key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
});


