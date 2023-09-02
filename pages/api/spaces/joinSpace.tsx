import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";
import { Server } from "socket.io";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    try {

        const { spaceId, userId, joinedUserData, socketId } = req.body;

        const existingSpace = await prisma.space.findFirst({
            where: {
                userIds: { has: userId },
            },
            include: {
                users: true
            }
        });

        

        if (existingSpace && existingSpace.id === spaceId) {
            // User is already in the current space, do nothing
            return res.status(200).json(existingSpace);
        }

        if (existingSpace) {
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

            res?.socket?.server?.io?.emit("joinSpace", leaveData);
            ``
        }

        const updatedSpace = await prisma.space.update({
            where: { id: spaceId },
            data: {
                userIds: {
                    push: userId,
                },

            },
            include: {
                users: true
            }
        });


        const data = {
            spaceId: spaceId,
            joinedUserData: joinedUserData,
            status: "joined"
        }

        res?.socket?.server?.io?.emit("joinSpace", data);



        return res.status(200).json(updatedSpace);
    } catch (error) {
        console.log("[JOIN_SPACE]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}