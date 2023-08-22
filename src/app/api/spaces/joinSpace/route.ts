import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request,
) {
    let updatedSpace
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();


        const { updatingObj, spaceId } = body;

        console.log("spaceId: ", spaceId);
        

        try {

            updatedSpace = await prisma.space.update({
                where: {
                    id: spaceId
                },
                data: updatingObj
            });

            console.log({updatedSpace});
            



        } catch (error) {
            console.log({ error });

        }


        return NextResponse.json({ updatedSpace })
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}