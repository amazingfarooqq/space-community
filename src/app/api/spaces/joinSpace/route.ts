import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { spaceId, userId } = body;

        const allSpaces = await prisma.space.findMany({ include: { users: true } });

        const spacesWithUserData = allSpaces.filter(space => space.userIds.includes(userId));

        let spacesWithUser = []

        for (const space of spacesWithUserData) {
            const updatedUserIds = space.userIds.filter(id => id !== userId);
            if (space.id === spaceId) return
            const up = await prisma.space.update({
                where: { id: space.id },
                data: { userIds: { set: updatedUserIds } },
                include: { users: true }
            });
            spacesWithUser.push(up);
        }

        const updatedSpace = await prisma.space.update({
            where: { id: spaceId },
            data: {
                userIds: { push: userId },
            },
            include: { users: true }
        });


        return NextResponse.json({ updatedSpace, spacesWithUser });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
