import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request
) {
    try {
        const body = await req.json();

        const {spaceid} = body;
        const data = await prisma.space.findUnique({
            where: {
                id:spaceid
            },
            include: {
                users: true
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};