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
const userid = {}

io.on("connection", (socket) => {
  const socketId = socket.handshake.query.socketId ? socket.handshake.query.socketId : socket.id;

  

  debugPrint(`User Connected: ${socketId}`);

  // spaces
  socket.on("create_space", (data) => {
    io.emit("create_space_response", data);
  })

  socket.on("join_space", (data) => {
    console.log("join currentSpace[socketId]:", socketId, data.userid);
    currentSpace[socketId] = data.updatedSpace.id
    userid[socketId] = data.userid
    io.emit("space_updated_response", data.updatedSpace);

    // socket.join(socket.io)

    // Emit a response back to the client (if needed)
    socket.emit("join_space_response", { message: "Join space request processed" });
  });

  socket.on("leave_space", (data) => {
    currentSpace[socketId] = data.id
    io.emit("space_updated_response", data);
  });


  socket.on("disconnect", () => {
    debugPrint("User Disconnected", socket);
    debugPrint("out", socketId);

    const disconnectedUserId = socketId;
    
    if(!currentSpace[socketId]) return
    console.log("disconnect currentSpace[socketId]:", socketId, currentSpace[socketId]);
    for (const spaceId in currentSpace) {
      if (currentSpace[spaceId].includes(disconnectedUserId)) {
        currentSpace[spaceId] = currentSpace[spaceId].filter(id => id !== disconnectedUserId);
        break;
      }
    }

    io.emit("on_disconnected", {
      socketid: socketId,
      userid: userid[socketId],
      currentSpace: currentSpace[socketId]
    });
  });
  // socket.on("logout", () => {
  //   debugPrint("User Disconnected", socket);
  //   debugPrint("out");

  //   io.emit("on_disconneted", {
  //     userid: socketId,
  //     currentSpace: 123
  //   });

  //   socket.disconnect(true);
  // });


});

module.exports = { app, server };
