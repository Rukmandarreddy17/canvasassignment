const colorPicker =
  document.getElementById("colorPicker");

const undoBtn =
  document.getElementById("undoBtn");

colorPicker.value = "#ff0000";


undoBtn.addEventListener("click", () => {
  socket.emit("undo");
});


function renderCursors() {
  Object.values(cursors).forEach((c) => {
    ctx.fillStyle = "blue";

    ctx.beginPath();
    ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(renderCursors);
}

renderCursors();
