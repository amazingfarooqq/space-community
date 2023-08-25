import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { space } = body;

        console.log("Space id:", space.id);
        console.log("User ids:", space.userIds);
        

        const updatedSpace = await prisma.space.update({
            where: { id: space.id },
            data: {
                userIds: { set: space.userIds }, // Update user IDs
                // users: { connect: space.userIds.map((userId: any) => ({ id: userId })) } // Connect users based on IDs
            },
            include: { users: true }
        });




        return NextResponse.json(updatedSpace);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
