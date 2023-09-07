import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../../types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    try {

        const { publicChatId,roomId,  socketId } = req.body;


        res?.socket?.server?.io.of("/").sockets.get(socketId)?.join(roomId);


        return res.status(200).json({joined: true});
    } catch (error) {
        console.log("[MESSAGES]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}