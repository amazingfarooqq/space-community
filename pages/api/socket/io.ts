import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { NextApiResponseServerIo } from "../../../types";
import prisma from "@/libs/prismadb";

const socketToUserDataMap: any = {};


export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    // res.socket.server.io.on("connection", (socket) => {
    //   console.log(`Socket connected 24: ${socket.id}`);
    // })

    // console.log(io);


  }

  SocketIoFunc(res.socket.server.io)
  res.end();
}

export default ioHandler;



const SocketIoFunc = (io: any) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    console.log(socketToUserDataMap);
    

    socket.on("saveUserData", (userData) => {
      socketToUserDataMap[socket.id] = userData;
    });

    socket.on('disconnect', async () => {
      console.log(`Socket disconnected: ${socket.id}`);

      // When a user disconnects, remove them from spaces and remove the mapping
      const userData = socketToUserDataMap[socket.id];

      if (userData?.id) {
        // Assuming you have a function to remove the user from spaces
        // await removeUserFromSpaces(userId);
        // Remove the mapping
        delete socketToUserDataMap[socket.id];

        // Optionally, you can emit a message to notify others that the user left.
        io.emit('userDisconneted', userData);
      }
    });
  });
};

// Implement the removeUserFromSpaces function based on your specific database logic
// async function removeUserFromSpaces(userId: any) {
//   const existingSpace = await prisma.space.findFirst({
//     where: {
//       userIds: { has: userId },
//     },
//     include: {
//       users: true
//     }
//   });

//   if (existingSpace) {
//     await prisma.space.update({
//       where: { id: existingSpace.id },
//       data: {
//         userIds: {
//           set: existingSpace.userIds.filter((id) => id !== userId),
//         },
//       },
//     });
//   }

//   console.log({ existingSpace });

//   // Your code here to remove the user from spaces
// }
