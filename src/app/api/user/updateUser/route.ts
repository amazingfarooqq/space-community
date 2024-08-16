import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request
) {
    try {
        const body = await req.json();

        const { uuid, data } = body;

        const updatedUser = await prisma.user.update({
            where: { id: uuid },
            data: data,
        });

        console.log({updatedUser});
        


        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log('[UPDATE_USER]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};