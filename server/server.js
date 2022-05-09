const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://ks-mastermind-client.herokuapp.com/",
    ],
  },
});

io.on("connection", (socket) => {
  var currentRoomId;

  socket.on("game ready", (gameId) => {
    try {
      let room = io.sockets.adapter.rooms.get(gameId);
      if (room === undefined) {
        // 0 players in room, create room
        this.join(gameId);
        currentRoomId = gameId;
      } else if (room.size === 1) {
        // 1 player currently in room
        this.join(gameId);
        currentRoomId = gameId;

        // make it assign who guesses randomly
        var isGuessingPlayer = Math.random() < 0.5;
        this.to(currentRoomId).emit("game ready received", isGuessingPlayer);
        this.emit("game ready received", !isGuessingPlayer);
      } else {
        // room is full
        this.emit("room is full");
      }
    } catch (error) {
      console.log(error);
    }
  });

  // send secret to other player
  socket.on("set secret", (secret) => {
    try {
      this.to(currentRoomId).emit("secret received", secret);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send circle guess", (circleGuess, index) => {
    try {
      this.to(currentRoomId).emit("circle guess received", circleGuess, index);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send row guess", (rowGuess) => {
    try {
      this.to(currentRoomId).emit("row guess received", rowGuess);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send game reset", () => {
    try {
      this.to(currentRoomId).emit("game reset received");
    } catch (error) {
      console.log(error);
    }
  });

  // send to active player that the other player disconnected
  socket.on("disconnecting", () => {
    try {
      this.to(currentRoomId).emit("other player left");
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen(process.env.PORT || 3001);
