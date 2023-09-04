import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    try {

        const { spaceId, userId, name } = req.body;

        const space = await prisma.space.findFirst({
            where: { id: spaceId },
        });

        if (!space) {
            return res.status(404).json({ error: "Space not found" });

        }


        const updatedSpace = await prisma.space.update({
            where: { id: spaceId },
            data: {
                userIds: { set: space.userIds.filter((id) => id !== userId) },
            },
            include: { users: true }
        });

        const leaveData = {
            spaceId: spaceId,
            leftUserId: userId,
            status: "left",
        };

        res?.socket?.server?.io?.to(spaceId).emit("space_msg", {
            text: `${name} left the space.`,
            uuid: "farooq",
            spaceId: spaceId,
            status: "left",
            createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        });

        // res?.socket?.server?.io.of("/").sockets.get(socketId)?.leave(spaceId);


        res?.socket?.server?.io?.emit("leaveSpace", leaveData);

        return res.status(200).json(updatedSpace);
    } catch (error) {
        console.log("[LEAVE_SPACE]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}