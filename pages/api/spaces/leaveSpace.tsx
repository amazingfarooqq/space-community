import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    try {

        const { spaceId, userId } = req.body;

        const space = await prisma.space.findFirst({
            where: { id: spaceId },
        });

        if (!space) {
            return res.status(404).json({error: "Space not found"});

        }

        const updatedSpace = await prisma.space.update({
            where: { id: spaceId },
            data: {
                userIds: { set: space.userIds.filter((id) => id !== userId) },
            },
            include: { users: true }
        });

        res?.socket?.server?.io?.emit("leave_space", updatedSpace);

        return res.status(200).json(updatedSpace);
    } catch (error) {
        console.log("[LEAVE_SPACE]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}