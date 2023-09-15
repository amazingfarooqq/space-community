import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try {

    const { publicChatId, msgData } = req.body;


    console.log({msgData});
    

    // res?.socket?.server?.io?.to(msgData.roomId).emit("public_msg", msgData);
    res?.socket?.server?.io?.emit("public_msg", msgData);


    return res.status(200).json(msgData);
  } catch (error) {
    console.log("[MESSAGES]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}