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

const spaces = new Map()
const userSpaceMap = new Map();
const activeUsersInSpace = new Map();



function sendSpacesAndActiveUsersToUser(socket) {
  const spacesWithActiveUsers = [];

  // Iterate through spaces and add active users to each space
  spaces.forEach((space, spaceId) => {
    const spaceData = { ...space, users: [] };

    if (activeUsersInSpace.has(spaceId)) {
      const activeUsersArray = Array.from(activeUsersInSpace.get(spaceId).values());
      spaceData.users = activeUsersArray;
    }

    spacesWithActiveUsers.push(spaceData);
  });

  socket.emit("receive_spaces", spacesWithActiveUsers);
}

io.on("connection", (socket) => {
  const { name, uuid } = socket.handshake.query;

  debugPrint(`User Connected: ${name} ${uuid} ${socket.id}`);

  io.emit("receive_uuid", uuid);


  sendSpacesAndActiveUsersToUser(socket);

  socket.on("join_space", (data) => {
    const { spaceId, joinedUserData } = data;

    debugPrint(`User Joined Space: ${spaceId} ${uuid}`);

    const prevSpaceId = userSpaceMap.get(uuid);
    if (prevSpaceId && prevSpaceId !== spaceId) {


      socket.leave(prevSpaceId);
      io.in(prevSpaceId).emit("receive_message", {
        text: `${name} left the space.`,
        uuid: "kurakani",
        spaceId: prevSpaceId,
        status: "left",
        createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      });

      io.emit("users_response", {
        spaceId: prevSpaceId,
        leftUserId: uuid,
        status: "left"
      });

      // Remove the user from the list of active users in the previous space
      if (activeUsersInSpace.has(prevSpaceId)) {
        activeUsersInSpace.get(prevSpaceId).delete(uuid);
      }
    }

    socket.join(spaceId);
    userSpaceMap.set(uuid, spaceId);

    // Add the user to the list of active users in the space
    if (!activeUsersInSpace.has(spaceId)) {
      activeUsersInSpace.set(spaceId, new Map());
    }
    activeUsersInSpace.get(spaceId).set(uuid, joinedUserData);


    // Increment the user count for the space
    io.in(spaceId).emit("receive_message", {
      text: `${name} joined the space.`,
      uuid: "kurakani",
      spaceId: spaceId,
      status: "joined",
      createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    });

    const sendres = {
      spaceId: spaceId,
      joinedUser: joinedUserData,
      status: "joined"
    }
    io.emit("users_response", sendres);
  });

  socket.on("leave_space", () => {
    const spaceId = userSpaceMap.get(uuid);


    debugPrint(`User Left Space: ${spaceId} ${uuid}`);


    if (spaceId) {
      userSpaceMap.delete(uuid);
      io.in(spaceId).emit("receive_message", {
        text: `${name} left the space.`,
        uuid: "kurakani",
        spaceId: spaceId,
        status: "left",
        createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      });

      io.emit("users_response", {
        spaceId: spaceId,
        leftUserId: uuid,
        status: "left"
      });


      socket.leave(spaceId);


      // Remove the user from the list of active users in the space
      if (activeUsersInSpace.has(spaceId)) {
        activeUsersInSpace.get(spaceId).delete(uuid);
      }

    }
  });

  socket.on("disconnect", () => {
    // debugPrint("User Disconnected", uuid);

    const spaceId = userSpaceMap.get(uuid);

    // debugPrint("User Disconnected", spaceId);
    debugPrint(`User Left Space: ${spaceId} ${uuid}`);

    if (spaceId) {
      userSpaceMap.delete(uuid);
      io.in(spaceId).emit("receive_message", {
        text: `${name} left the space.`,
        uuid: "kurakani",
        spaceId: spaceId,
        status: "left",
        createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      });

      io.emit("users_response", {
        spaceId: spaceId,
        leftUserId: uuid,
        status: "left"
      });

      socket.leave(spaceId);


      // Remove the user from the list of active users in the space
      if (activeUsersInSpace.has(spaceId)) {
        activeUsersInSpace.get(spaceId).delete(uuid);
      }

    }
  });

  socket.on("send_message", (msg) => {
    io.in(msg.spaceId).emit("receive_message", msg);
  });

  socket.on("send_space", (space) => {

    spaces.set(space.id, space);
    io.emit("receive_space", space);
  });
});

module.exports = { app, server };
