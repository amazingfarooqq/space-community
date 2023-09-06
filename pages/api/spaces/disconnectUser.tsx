import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";
import { Server } from "socket.io";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    try {

        const { userData  } = req.body;

        const userId = userData.id
        const userName  = userData.name


        console.log("api/spaces/disconnetUser",{userId});
        

        const existingSpace = await prisma.space.findFirst({
            where: {
                userIds: { has: userId },
            },
            include: {
                users: true
            }
        });

        if (!existingSpace) {
            // User is already in the current space, do nothing
            return res.status(200).json({ error: "User is not in the space" });
        }

        // User is in an existing space, remove them from that space
        const updatedExistingSpace = await prisma.space.update({
            where: { id: existingSpace.id },
            data: {
                userIds: {
                    set: existingSpace.userIds.filter((id) => id !== userId),
                },
            },
        });

        // Notify other users in the existing space that this user has left
        const leaveData = {
            spaceId: existingSpace.id,
            leftUserId: userId,
            status: "left",
        };
        res?.socket?.server?.io?.to(existingSpace.id).emit("space_msg", {
            text: `${userName} left the space ${new Date().toDateString()}.`,
            uuid: userId,
            spaceId: existingSpace.id,
            status: "left",
            createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        });


        res?.socket?.server?.io?.emit("leaveSpace", leaveData);


        return res.status(200).json(existingSpace);
    } catch (error) {
        console.log("[JOIN_SPACE]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}