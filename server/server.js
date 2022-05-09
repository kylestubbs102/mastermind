const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "https://ks-mastermind-client.herokuapp.com/"],
  },
});

io.on("connection", (socket) => {
  var currentRoomId;

  socket.on("game ready", (gameId) => {
    try {
      let room = io.sockets.adapter.rooms.get(gameId);
      if (room === undefined) {
        // 0 players in room, create room
        socket.join(gameId);
        currentRoomId = gameId;
      } else if (room.size === 1) {
        // 1 player currently in room
        socket.join(gameId);
        currentRoomId = gameId;

        // make it assign who guesses randomly
        var isGuessingPlayer = Math.random() < 0.5;
        socket.to(currentRoomId).emit("game ready received", isGuessingPlayer);
        socket.emit("game ready received", !isGuessingPlayer);
      } else {
        // room is full
        socket.emit("room is full");
      }
    } catch (error) {
      console.log(error);
    }
  });

  // send secret to other player
  socket.on("set secret", (secret) => {
    try {
      socket.to(currentRoomId).emit("secret received", secret);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send circle guess", (circleGuess, index) => {
    try {
      socket
        .to(currentRoomId)
        .emit("circle guess received", circleGuess, index);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send row guess", (rowGuess) => {
    try {
      socket.to(currentRoomId).emit("row guess received", rowGuess);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send game reset", () => {
    try {
      socket.to(currentRoomId).emit("game reset received");
    } catch (error) {
      console.log(error);
    }
  });

  // send to active player that the other player disconnected
  socket.on("disconnecting", () => {
    try {
      socket.to(currentRoomId).emit("other player left");
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen(process.env.PORT || 3001);
