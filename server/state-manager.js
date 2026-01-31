const rooms = {};

function init(room) {
  if (!rooms[room]) {
    rooms[room] = [];
  }
}

module.exports = {
  // Add new stroke
  add(room, stroke) {
    init(room);
    rooms[room].push(stroke);
  },

  // Get all strokes
  get(room) {
    init(room);
    return rooms[room];
  },

  // Undo last stroke of user
  undo(room, userId) {
    init(room);

    for (let i = rooms[room].length - 1; i >= 0; i--) {
      if (rooms[room][i].userId === userId) {
        rooms[room].splice(i, 1);
        break;
      }
    }
  },

  // Clear all strokes (new session)
  clear(room) {
    rooms[room] = [];
  },
};
