import { NextApiRequest } from "next";
import prisma from "@/libs/prismadb";
import { NextApiResponseServerIo } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try {
    const { spaceId } = req.body;

    // Check if spaceId is provided
    if (!spaceId) {
      return res.status(400).json({ message: "Space ID is required" });
    }

    // Delete the space by ID
    await prisma.space.delete({
      where: {
        id: spaceId,
      },
    });

    // Emit an event to inform clients about the deletion
    res?.socket?.server?.io?.emit("deleteSpace", spaceId);

    return res.status(200).json({ message: "Space deleted successfully" });
  } catch (error) {
    console.log("SERVER: [DELETE_SPACE]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
