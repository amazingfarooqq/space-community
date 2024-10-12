import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request
) {
    try {
        const body = await req.json();

        const { uuid } = body;

        const data = await prisma.user.findUnique({
            where: {
                id: uuid
            },
            include: {
                following: true,
                followedBy: true,
            },
        });


        return NextResponse.json(data);
    } catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};