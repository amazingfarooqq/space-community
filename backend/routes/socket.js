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

let spaceUsers = {};

io.on("connection", (socket) => {
  const username = socket.handshake.query.username
  const socketid = socket.handshake.query.socketid

  console.log("User Connected:", {username, socketid})
  debugPrint(`User Connected: ${socketid}`);

  io.emit("receive_socketid", socketid);

  socket.on("join_space", (data) => {
    const spaceId = data.spaceId;
    const joinedUser = data.joinedUserData;

    // console.log({data});
    // console.log({spaceId})
    console.log(joinedUser);
    socket.join(spaceId);
    spaceUsers = {
      ...spaceUsers,
      [spaceId]: [...(spaceUsers[spaceId] ?? []), joinedUser],
    };

    console.log({spaceUsers});

    // console.log(spaceUsers[spaceId]);
    io.in(spaceId).emit("receive_message", {
      text: username + " joined the space.",
      socketId: "kurakani",
      spaceId: spaceId,
      status: "joined",
      createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    });

    const sendres = {
      spaceId: spaceId,
      // spaceUsers: spaceUsers[spaceId],
      joinedUser: joinedUser,
      status: "joined"
    }
    // console.log("sendres", sendres.spaceId);
    io.emit("users_response", sendres);
    // debugPrint(`User with ID: ${socketid} joined space: ${spaceId}`);
  });

  socket.on("leave_space", (spaceId) => {
    if (spaceUsers[spaceId] && spaceUsers[spaceId].includes(socketid)) {
      spaceUsers[spaceId] = spaceUsers[spaceId].filter((id) => id !== socketid);

      io.in(spaceId).emit("users_response", {
        spaceId,
        spaceUsers: spaceUsers[spaceId]
      });

      io.in(spaceId).emit("receive_message", {
        text: username + " left the space.",
        socketId: "kurakani",
        spaceId: spaceId,
        status: "left",
        createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      });

      socket.leave(spaceId); // Leave the space

      debugPrint(`User with ID: ${socketid} left space: ${spaceId}`);
    }
  });

  socket.on("send_message", (data) => {
    io.in(data.spaceId).emit("receive_message", data);
  });

  socket.on("send_space", (data) => {
    io.emit("receive_space", data);
  });

  socket.on("disconnect", () => {
    debugPrint("User Disconnected", socketid);
    for (const [spaceId, users] of Object.entries(spaceUsers)) {
      const userIndex = users.findIndex(user => user.id === socketid);
      if (userIndex !== -1) {
        const leftUser = spaceUsers[spaceId][userIndex];
        spaceUsers[spaceId].splice(userIndex, 1);
    
        const sendres = {
          spaceId: spaceId,
          // spaceUsers: spaceUsers[spaceId],
          leftUserId: leftUser.id,
          status: "left"
        }

        io.emit("users_response", sendres);
    
        io.in(spaceId).emit("receive_message", {
          text: username + " left the space.",
          socketId: "kurakani",
          spaceId: spaceId,
          status: "left",
          createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        });
      }
      // if (users.includes(socketid)) {
      //   spaceUsers[spaceId] = [...users.filter((id) => id !== socketid)];

      //   io.emit("users_response", {
      //     spaceId,
      //     spaceUsers: spaceUsers[spaceId]
      //   });

      //   io.in(spaceId).emit("receive_message", {
      //     text: username + " left the space.",
      //     socketId: "kurakani",
      //     spaceId: spaceId,
      //     status: "left",
      //     createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      //   });
      // }
    }
    // io.emit("users_response", roomar);
  });
});

module.exports = { app, server };
