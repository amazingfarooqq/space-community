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

const userSpaceMap = new Map();
const activeUsersInSpace = new Map()

io.on("connection", (socket) => {
  const { name, uuid } = socket.handshake.query;

  debugPrint(`User Connected: ${name} ${uuid} ${socket.id}`);

  io.emit("receive_uuid", uuid);


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
    }

    socket.join(spaceId);
    userSpaceMap.set(uuid, spaceId);


    // Add the user to the active users in the space
    if (!activeUsersInSpace.has(spaceId)) {
      activeUsersInSpace.set(spaceId, new Set());
    }
    activeUsersInSpace.get(spaceId).add(uuid);

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


      // Remove the user from the activeUsersInSpace map
      if (activeUsersInSpace.has(spaceId)) {
        const activeUsers = activeUsersInSpace.get(spaceId);
        activeUsersInSpace.set(
          spaceId,
          activeUsers.filter((user) => user.uuid !== uuid)
        );
      }
      socket.leave(spaceId);

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


      // Remove the user from the activeUsersInSpace map
      if (activeUsersInSpace.has(spaceId)) {
        const activeUsers = activeUsersInSpace.get(spaceId);
        activeUsersInSpace.set(
          spaceId,
          activeUsers.filter((user) => user.uuid !== uuid)
        );
      }

      socket.leave(spaceId);

    }
  });

  socket.on("send_message", (msg) => {
    io.in(msg.spaceId).emit("receive_message", msg);
  });

  socket.on("send_space", (space) => {
    io.emit("receive_space", space);
  });
});

module.exports = { app, server };
