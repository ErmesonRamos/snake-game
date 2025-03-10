const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const draw = () => {
  ctx.fillStyle = 'red'
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 55, 50);
};

draw();