const express = require("express");
const app = express();
const port = 5000;
const http = require("http");
const server = http.createServer(app);
const path = require("path");

const { Server } = require("socket.io");

const io = new Server(server, {
  connectionStateRecovery: {},
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

io.on("connection", (socket) => {
  console.log("new user Connect ", socket.id);

  socket.on("chat-message", (message) => {
    //  console.log("message" + message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(port, (req, res) => {
  console.log(`server running at http://localhost:${port}`);
});
