const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let prevPos = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function getCoords(e) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function drawLine(start, end, color, width = 4) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  prevPos = getCoords(e);
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  prevPos = null;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const pos = getCoords(e);
  const color = colorPicker.value;

  drawLine(prevPos, pos, color);

  sendDraw(prevPos, pos, color);

  prevPos = pos;
});
