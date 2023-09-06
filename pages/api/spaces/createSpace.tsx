import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try {

    const { newSpace } = req.body;


    let createdSpace = await prisma.space.create({
      data: newSpace,
      include: {
        users: true,
      }
    });

    res?.socket?.server?.io?.emit("createSpace", createdSpace);

    return res.status(200).json(createdSpace);
  } catch (error) {
    console.log("[CREATE_SPACE]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}