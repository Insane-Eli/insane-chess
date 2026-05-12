const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");


const publicPath = path.join(__dirname, "../");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
server.listen(port, () => {
  console.log("Server up on port", port);
});

var pgn = "";

io.on("connection", (socket) => {
  console.log("user connected");
  io.emit("refreshBoard", pgn);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("resetGame", () => {
    io.emit("resetGame");
  });

  socket.on("clearGame", () => {
    io.emit("clearGame");
  });

  socket.on("newMove", (newMove, newPgn) => {
    pgn = newPgn
    io.emit("newMove", newMove, pgn);
  });
});
