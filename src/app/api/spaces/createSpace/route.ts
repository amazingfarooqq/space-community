import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        let createdSpace

        const {newSpace} = body;

        try {

           createdSpace = await prisma.space.create({
                data: newSpace
            });


        } catch (error) {
            console.log({ error });

        }


        return NextResponse.json(createdSpace)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}