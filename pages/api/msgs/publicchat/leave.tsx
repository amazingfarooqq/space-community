import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try {

    const { publicChatId, msgData , socketId} = req.body;



    res?.socket?.server?.io?.to(msgData.roomId).emit("leave_public_chat", { name: msgData.name });
    res?.socket?.server?.io?.to(msgData.roomId).emit("public_msg", msgData);
    res?.socket?.server?.io.of("/").sockets.get(socketId)?.leave(msgData.roomId);


    return res.status(200).json(msgData);
  } catch (error) {
    console.log("[MESSAGES]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}