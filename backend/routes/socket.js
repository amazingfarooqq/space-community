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

const spaces = []

let remove_space_in = 60000


// Helper function to remove a space by spaceId
function removeSpace(spaceId) {
  const index = spaces.findIndex((space) => space.spaceid === spaceId);
  if (index !== -1) {
    spaces.splice(index, 1);
  }
}

io.on("connection", (socket) => {

  // io.emit("users_response", roomUsers);
  debugPrint(`User Connected: ${socket.id}`);
  io.emit("receive_spaces", {spaces, sockedid: socket.id});

  // spaces
  socket.on("create_space", (data) => {
    spaces.push(data)
    io.emit("create_space_response", data);


    setTimeout(() => {
      const createdSpace = spaces.find((space) => space.spaceid === data.spaceid);
      if (createdSpace && createdSpace.spaceusers.length === 0) {
        removeSpace(data.spaceid); // Remove the space from the list
        io.emit("receive_spaces", spaces); // Update the spaces list on all clients
      }
    }, remove_space_in); // 10 seconds

  })

  socket.on("join_space", (data) => {
    const { spaceId, joinedUserData } = data;
    const spaceToJoin = spaces.find(space => space.spaceid === spaceId);

    if (spaceToJoin) {
      // Remove the user from their previous space, if any
      const previousSpace = spaces.find(space => space.spaceusers.some(user => user.socketid === socket.id));
      if (previousSpace) {
        previousSpace.spaceusers = previousSpace.spaceusers.filter(user => user.socketid !== socket.id);
        io.emit("space_joined_response", previousSpace); // Update the previous space on all clients
      }

      // Simulate a user joining the new space by adding them to the spaceusers array
      spaceToJoin.spaceusers.push({socketid:socket.id,...joinedUserData});

      // Emit the updated new space data to the joined user
      socket.emit("space_joined_response", spaceToJoin);

      // Broadcast the updated new space data to all users in the new space
      io.emit("space_joined_response", spaceToJoin);
    }
    
  });


  socket.on("disconnect", () => {
    debugPrint("User Disconnected", socket.id);
    socket.disconnect(true);

    spaces.forEach((space) => {
      space.spaceusers = space.spaceusers.filter((user) => user.socketid !== socket.id);
      io.emit("space_joined_response", space); // Update the space on all clients


      if (space.spaceusers.length === 0) {
        setTimeout(() => {
          if (space.spaceusers.length === 0) {
            removeSpace(space.spaceid); // Remove the space from the list
            io.emit("receive_spaces", spaces); // Update the spaces list on all clients
          }
        }, remove_space_in); // 10 seconds
      }

    });


  });

  socket.on("logout", () => {
    debugPrint("User Disconnected", socket.id);

    socket.disconnect(true);
  });


});

module.exports = { app, server };
