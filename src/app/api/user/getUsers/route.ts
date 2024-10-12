import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function GET(
    req: Request
) {
    try {

        const data = await prisma.user.findMany({
            include: {
              following: true,
              followedBy: true,
            },
          })
        
        return NextResponse.json(data);
    } catch (error) {
        console.log('[USERS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};