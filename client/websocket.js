
window.socket = io();


window.cursors = {};


window.sendDraw = function (start, end, color) {
  socket.emit("drawing", {
    start,
    end,
    color,
    width: 4,
  });
};


socket.on("drawing", (data) => {
  drawLine(
    data.start,
    data.end,
    data.color,
    data.width
  );
});


socket.on("load_history", (history) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  history.forEach((stroke) => {
    drawLine(
      stroke.start,
      stroke.end,
      stroke.color,
      stroke.width
    );
  });
});


canvas.addEventListener("mousemove", (e) => {
  const pos = getCoords(e);
  socket.emit("cursor", pos);
});


socket.on("cursor", (data) => {
  cursors[data.id] = data;
});


socket.on("user_left", (id) => {
  delete cursors[id];
});
