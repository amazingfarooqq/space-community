const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const debugPrint = require("../utils/debugPrint");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
  },
});


const currentSpace = {}

io.on("connection", (socket) => {

  debugPrint(`User Connected: ${socket.id}`);

  // spaces
  socket.on("create_space", (data) => {
    io.emit("create_space_response", data);
  })

  socket.on("join_space", (data) => {
    console.log("Join space event received with data:", data);
    currentSpace[socket.id] = data.id
    io.emit("space_updated_response", data);

    // socket.join(socket.io)

    // Emit a response back to the client (if needed)
    socket.emit("join_space_response", { message: "Join space request processed" });
  });

  socket.on("leave_space", (data) => {
    currentSpace[socket.id] = data.id
    io.emit("space_updated_response", data);
  });

  socket.on("leave_space", () => {
    debugPrint("User Disconnected", socket);
    debugPrint("out");

    const disconnectedUserId = socket.id;

    for (const spaceId in currentSpace) {
      if (currentSpace[spaceId].includes(disconnectedUserId)) {
        currentSpace[spaceId] = currentSpace[spaceId].filter(id => id !== disconnectedUserId);
        break;
      }
    }

    io.emit("on_disconnected", {
      userid: socket.id,
      currentSpace: currentSpace[socket.id]
    });
  });

  socket.on("disconnect", () => {
    debugPrint("User Disconnected", socket);
    debugPrint("out");

    const disconnectedUserId = socket.id;

    for (const spaceId in currentSpace) {
      if (currentSpace[spaceId].includes(disconnectedUserId)) {
        currentSpace[spaceId] = currentSpace[spaceId].filter(id => id !== disconnectedUserId);
        break;
      }
    }

    io.emit("on_disconnected", {
      userid: socket.id,
      currentSpace: currentSpace[socket.id]
    });
  });
  // socket.on("logout", () => {
  //   debugPrint("User Disconnected", socket);
  //   debugPrint("out");

  //   io.emit("on_disconneted", {
  //     userid: socket.id,
  //     currentSpace: 123
  //   });

  //   socket.disconnect(true);
  // });


});

module.exports = { app, server };
