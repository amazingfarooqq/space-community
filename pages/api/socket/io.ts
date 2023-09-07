import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { NextApiResponseServerIo } from "../../../types";


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

  }

  SocketIoFunc(res.socket.server.io)
  res.end();
}

export default ioHandler;



const SocketIoFunc = (io: any) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);
    const { userId, userName, userEmail, userImage } = socket.handshake.query;

    console.log('user connected', userId, userName, userEmail, userImage);
    


    socket.on('disconnect', async () => {
      console.log(`Socket disconnected: ${socket.id}`);


      if (userId) {
        io.emit('userDisconneted', {
          id: userId,
          name: userName,
          email: userEmail,
          image: userImage,
        });
      }
    });
  });
};
