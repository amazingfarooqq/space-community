import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try {

    const data = await prisma.space.findMany({
      orderBy: {
        createdAt: "desc" 
      },
      include: {
        users: true 
      }
    });




    return res.status(200).json(data);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}