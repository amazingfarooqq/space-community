import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try {

    const { spaceId, msgData } = req.body;

    console.log({spaceId});


    res?.socket?.server?.io?.to(spaceId).emit("space_msg", msgData);

    return res.status(200).json(msgData);
  } catch (error) {
    console.log("[MESSAGES]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}