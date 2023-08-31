import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { spaceId, userId } = body;

        const space = await prisma.space.findUnique({
            where: { id: spaceId },
            include: { users: true }
        });

        if (!space) {
            return new NextResponse('Space not found', { status: 404 });
        }


        const updatedUserIds = [];
        for (const id of space.userIds) {
            if (id !== userId) {
                updatedUserIds.push(id);
            }
        }

        const updatedSpace = await prisma.space.update({
            where: { id: spaceId },
            data: {
                userIds: { set: updatedUserIds },
            },
            include: { users: true }
        });

        return NextResponse.json(updatedSpace);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
