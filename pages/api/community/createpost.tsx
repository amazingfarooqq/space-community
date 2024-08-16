import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try {

    const { newPost } = req.body;


    return res.status(200).json({TEST: "S"});
  } catch (error) {
    console.log("SERVER: [CREATE_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}