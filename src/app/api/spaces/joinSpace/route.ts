import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { spaceId, userId, joinedUserData } = body;

        const existingSpace = await prisma.space.findFirst({
            where: {
                userIds: {
                    has: userId,
                },
            },
        });

        if (existingSpace && existingSpace.id === spaceId) {
            // User is already in the current space, do nothing
            return NextResponse.json(existingSpace);
        }


        if (existingSpace) {
            // User is in an existing space, remove them from that space
            const updatedExistingSpace = await prisma.space.update({
                where: {
                    id: existingSpace.id,
                },
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

            pusherServer.trigger('my-channel', 'spaceupdates', leaveData);
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


        console.log({ existingSpace, updatedSpace, joinedUserData });


        const data = {
            spaceId: spaceId,
            joinedUserData: joinedUserData,
            status: "joined"
        }


        pusherServer.trigger('my-channel', 'spaceupdates', data);



        return NextResponse.json(updatedSpace);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
