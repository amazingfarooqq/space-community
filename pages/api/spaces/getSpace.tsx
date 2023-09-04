import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    try {


        const { spaceId } = req.body;


        const data = await prisma.space.findFirst({
            where: {
                id: spaceId
            },
            include: {
                users: true
            }
        })

        if (!data) {
            // Space does not exist, return a 404 error response
            return res.status(404).json({ message: "Space not found" });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log("[GET_SPACE]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}