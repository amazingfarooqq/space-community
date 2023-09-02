import { NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    try {


        const { spaceId } = req.body;


        const data = await prisma.space.findUnique({
            where: {
                id: spaceId
            },
            include: {
                users: true
            }
        })

        return res.status(200).json(data);
    } catch (error) {
        console.log("[GET_SPACE]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}